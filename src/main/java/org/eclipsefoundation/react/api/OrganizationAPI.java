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
package org.eclipsefoundation.react.api;

import java.util.Set;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import org.eclipsefoundation.react.api.model.Organization;

@Path("member")
@RegisterRestClient(configKey = "fdn-api")
public interface OrganizationAPI {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    Set<Organization> organizations(@QueryParam("working_group") String workingGroup, @QueryParam("page") int page);

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    Organization organizationByID(@PathParam("id") String id);

}
