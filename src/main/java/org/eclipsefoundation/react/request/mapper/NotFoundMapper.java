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
package org.eclipsefoundation.react.request.mapper;

import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;
import java.util.Optional;

import javax.annotation.Priority;
import javax.inject.Inject;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import org.apache.commons.io.IOUtils;
import org.eclipsefoundation.core.service.CachingService;
import org.jboss.resteasy.specimpl.MultivaluedMapImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Provider
@Priority(1)
public class NotFoundMapper implements ExceptionMapper<NotFoundException> {
    public static final Logger LOGGER = LoggerFactory.getLogger(NotFoundMapper.class);

    @Inject
    CachingService cache;

    @Override
    public Response toResponse(NotFoundException exception) {
        Optional<String> errorPage = cache.get("404_standard", new MultivaluedMapImpl<>(), String.class,
                this::getNotFoundPageContents);
        // if we couldn't get the error page, return an empty server error page
        if (errorPage.isEmpty()) {
            return Response.status(503).build();
        }
        return Response.status(404).entity(errorPage.get()).build();
    }

    private String getNotFoundPageContents() {
        try (InputStream stream = Thread.currentThread().getContextClassLoader()
                .getResourceAsStream("META-INF/resources/404.html")) {
            StringWriter writer = new StringWriter();
            IOUtils.copy(stream, writer, "utf-8");
            return writer.toString();
        } catch (IOException e) {
            LOGGER.error("Error while reading in file", e);
        }
        return null;
    }
}
