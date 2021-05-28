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

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.eclipsefoundation.react.api.OrganizationAPI;

@Path("organizations")
@Produces(MediaType.APPLICATION_JSON)
public class OrganizationResource {

    @RestClient
    @Inject
    OrganizationAPI orgAPI;

    @GET
    public Response get() {
        return Response.ok(orgAPI.organizations("", 1)).build();
    }
}
