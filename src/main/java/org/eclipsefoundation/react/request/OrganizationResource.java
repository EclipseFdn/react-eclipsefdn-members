/**
 * Copyright (c) 2021 Eclipse Foundation
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * Author: Martin Lowe <martin.lowe@eclipse-foundation.org>
 *
 * SPDX-License-Identifier: EPL-2.0
 */
package org.eclipsefoundation.react.request;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.eclipsefoundation.react.api.OrganizationAPI;
import org.eclipsefoundation.react.api.model.Organization;
import org.jboss.resteasy.specimpl.MultivaluedMapImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Allows for external organizations data to be retrieved and displayed. This
 * endpoint is unencrypted as all data displayed is publicly available
 * information.
 */
@Path("organizations")
@Produces(MediaType.APPLICATION_JSON)
public class OrganizationResource extends AbstractRESTResource {
    public static final Logger LOGGER = LoggerFactory.getLogger(OrganizationResource.class);

    @RestClient
    @Inject
    OrganizationAPI orgAPI;

    @GET
    public Response get() {
        Optional<List<Organization>> orgs = cache.get("all", new MultivaluedMapImpl<>(), Organization.class, () -> getAll(null));
        if (orgs.isEmpty()) {
            return Response.noContent().build();
        }
        return Response.ok(orgs.get()).build();
    }

    @GET
    @Path("{orgID}")
    public Response get(@PathParam("orgID") String organizationID) {
        Organization org = orgAPI.organizationByID(organizationID);
        if (org == null) {
            return Response.noContent().build();
        }
        return Response.ok(orgAPI.organizationByID(organizationID)).build();
    }

    private List<Organization> getAll(String workingGroup) {
        String actualWG = workingGroup == null ? "" : workingGroup;
        List<Organization> orgs = new LinkedList<>();
        Set<Organization> tmp = Collections.emptySet();
        int count = 1;
        do {
            tmp = orgAPI.organizations(actualWG, count);
            orgs.addAll(tmp);
            LOGGER.error("{}",tmp);
            count++;
        } while(!tmp.isEmpty() && tmp != null);
        return orgs;
    }
}
