package org.eclipsefoundation.react.request;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import org.eclipsefoundation.core.helper.CSRFHelper;
import org.eclipsefoundation.core.namespace.DefaultUrlParameterNames;
import org.eclipsefoundation.persistence.model.RDBMSQuery;
import org.eclipsefoundation.react.model.MembershipForm;
import org.eclipsefoundation.react.namespace.MembershipFormAPIParameterNames;
import org.jboss.resteasy.specimpl.MultivaluedMapImpl;

import io.quarkus.security.Authenticated;

/**
 * Handles membership form CRUD requests.
 *
 * @author Martin Lowe
 */
@Authenticated
@Path("form")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class MembershipFormResource extends AbstractRESTResource {

    @Context
    SecurityContext ctx;

    @GET
    public Response getAll(@HeaderParam(value = CSRFHelper.CSRF_HEADER_NAME) String csrf) {
        // ensure csrf
        csrfHelper.compareCSRF(aud, csrf);
        // create parameter map
        MultivaluedMap<String, String> params = new MultivaluedMapImpl<>();
        params.add(MembershipFormAPIParameterNames.USER_ID.getName(), ident.getPrincipal().getName());
        // retrieve the possible cached object
        Optional<List<MembershipForm>> cachedResults = cache.get(ALL_CACHE_PLACEHOLDER, params, MembershipForm.class,
                () -> dao.get(new RDBMSQuery<>(wrap, filters.get(MembershipForm.class), params)));
        if (!cachedResults.isPresent()) {
            return Response.serverError().build();
        }
        // return the results as a response
        return responseBuider.build(ALL_CACHE_PLACEHOLDER, wrap, params, cachedResults.get(), MembershipForm.class);
    }

    @GET
    @Path("{id}")
    public Response get(@PathParam("id") String formID, @HeaderParam(value = CSRFHelper.CSRF_HEADER_NAME) String csrf) {
        // ensure csrf
        csrfHelper.compareCSRF(aud, csrf);
        // create parameter map
        MultivaluedMap<String, String> params = new MultivaluedMapImpl<>();
        params.add(DefaultUrlParameterNames.ID.getName(), formID);

        // retrieve the possible cached object
        Optional<List<MembershipForm>> cachedResults = cache.get(formID, params, MembershipForm.class,
                () -> dao.get(new RDBMSQuery<>(wrap, filters.get(MembershipForm.class), params)));
        if (!cachedResults.isPresent()) {
            return Response.serverError().build();
        }
        // return the results as a response
        return responseBuider.build(formID, wrap, params, cachedResults.get(), MembershipForm.class);
    }

    @POST
    public List<MembershipForm> create(MembershipForm mem) {
        mem.setUserID(ident.getPrincipal().getName());
        return dao.add(new RDBMSQuery<>(wrap, filters.get(MembershipForm.class)), Arrays.asList(mem));
    }

    @PUT
    @Path("{id}")
    public List<MembershipForm> update(@PathParam("id") String formID, MembershipForm mem) {
        // need to fetch ref to use attached entity
        MembershipForm ref = dao.getReference(formID, MembershipForm.class);
        ref.setUserID(ident.getPrincipal().getName());
        ref.setMembershipLevel(mem.getMembershipLevel());
        ref.setSigningAuthority(mem.isSigningAuthority());
        return dao.add(new RDBMSQuery<>(wrap, filters.get(MembershipForm.class)), Arrays.asList(ref));
    }

    @DELETE
    @Path("{id}")
    public Response delete(@PathParam("id") String formID) {
        MultivaluedMap<String, String> params = new MultivaluedMapImpl<>();
        params.add(DefaultUrlParameterNames.ID.getName(), formID);
        params.add(MembershipFormAPIParameterNames.USER_ID.getName(), ident.getPrincipal().getName());

        dao.delete(new RDBMSQuery<>(wrap, filters.get(MembershipForm.class), params));
        return Response.ok().build();
    }
}
