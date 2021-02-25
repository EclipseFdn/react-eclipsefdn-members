package org.eclipsefoundation.react.request;

import java.util.Arrays;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;

import org.eclipsefoundation.core.helper.CSRFHelper;
import org.eclipsefoundation.core.namespace.DefaultUrlParameterNames;
import org.eclipsefoundation.persistence.model.RDBMSQuery;
import org.eclipsefoundation.react.model.MembershipForm;
import org.eclipsefoundation.react.model.WorkingGroup;
import org.eclipsefoundation.react.namespace.MembershipFormAPIParameterNames;
import org.jboss.resteasy.specimpl.MultivaluedMapImpl;

import io.quarkus.security.Authenticated;

/**
 * Handles organization CRUD requests.
 *
 * @author Martin Lowe
 */
@Authenticated
@Path("form/{id}/working_groups")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class WorkingGroupsResource extends AbstractRESTResource {

    @GET
    public Response getWorkingGroups(@PathParam("id") String formID,
            @HeaderParam(value = CSRFHelper.CSRF_HEADER_NAME) String csrf) {
        // ensure csrf
        csrfHelper.compareCSRF(aud, csrf);
        // create parameter map
        MultivaluedMap<String, String> params = new MultivaluedMapImpl<>();
        params.add(MembershipFormAPIParameterNames.FORM_ID.getName(), formID);
        // retrieve the possible object
        List<WorkingGroup> results = dao.get(new RDBMSQuery<>(wrap, filters.get(WorkingGroup.class), params));
        if (results == null) {
            return Response.serverError().build();
        }
        // return the results as a response
        return Response.ok(results).build();
    }

    @POST
    public List<WorkingGroup> createWorkingGroup(@PathParam("id") String formID, WorkingGroup wg) {
        wg.setForm(dao.getReference(formID, MembershipForm.class));
        return dao.add(new RDBMSQuery<>(wrap, filters.get(WorkingGroup.class)), Arrays.asList(wg));
    }

    @GET
    @Path("{wgID}")
    public Response getWorkingGroup(@PathParam("id") String formID, @PathParam("wgID") String wgID,
            @HeaderParam(value = CSRFHelper.CSRF_HEADER_NAME) String csrf) {
        // ensure csrf
        csrfHelper.compareCSRF(aud, csrf);
        // create parameter map
        MultivaluedMap<String, String> params = new MultivaluedMapImpl<>();
        params.add(DefaultUrlParameterNames.ID.getName(), wgID);
        params.add(MembershipFormAPIParameterNames.FORM_ID.getName(), formID);
        // retrieve the possible object
        List<WorkingGroup> results = dao.get(new RDBMSQuery<>(wrap, filters.get(WorkingGroup.class), params));
        if (results == null) {
            return Response.serverError().build();
        }
        // return the results as a response
        return Response.ok(results).build();
    }

    @PUT
    @Path("{wgID}")
    public List<WorkingGroup> updateWorkingGroup(@PathParam("id") String formID, WorkingGroup wg,
            @PathParam("wgID") String wgID) {
        // need to fetch ref to use attached entity
        WorkingGroup ref = dao.getReference(formID, WorkingGroup.class);
        ref.setForm(dao.getReference(formID, MembershipForm.class));
        ref.setContact(wg.getContact());
        ref.setEffectiveDate(wg.getEffectiveDate());
        ref.setParticipationLevel(wg.getParticipationLevel());
        ref.setWorkingGroupID(wg.getWorkingGroupID());
        return dao.add(new RDBMSQuery<>(wrap, filters.get(WorkingGroup.class)), Arrays.asList(wg));
    }

    @DELETE
    @Path("{wgID}")
    public Response deleteWorkingGroup(@PathParam("wgID") String id) {
        MultivaluedMap<String, String> params = new MultivaluedMapImpl<>();
        params.add(DefaultUrlParameterNames.ID.getName(), id);
        params.add(MembershipFormAPIParameterNames.USER_ID.getName(), ident.getPrincipal().getName());

        dao.delete(new RDBMSQuery<>(wrap, filters.get(WorkingGroup.class), params));
        return Response.ok().build();
    }
}
