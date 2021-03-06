package org.eclipsefoundation.react.resources;

import static io.restassured.RestAssured.given;
import static io.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchemaInClasspath;

import java.util.Collections;
import java.util.Optional;

import javax.json.bind.Jsonb;

import org.eclipsefoundation.core.config.JsonBConfig;
import org.eclipsefoundation.core.helper.CSRFHelper;
import org.eclipsefoundation.react.model.Address;
import org.eclipsefoundation.react.model.FormOrganization;
import org.eclipsefoundation.react.test.helper.AuthHelper;
import org.eclipsefoundation.react.test.helper.SchemaNamespaceHelper;
import org.hamcrest.text.IsEmptyString;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import io.quarkus.test.common.QuarkusTestResource;
import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.oidc.server.OidcWiremockTestResource;
import io.restassured.filter.session.SessionFilter;
import io.restassured.http.ContentType;

@QuarkusTest
@QuarkusTestResource(OidcWiremockTestResource.class)
public class FormOrganizationResourceTest {
    public static final String SAMPLE_ORGANIZATION_ID = "sample_organization_id";

    public static final String FORM_ORGANIZATION_BASE_URL = MembershipFormResourceTest.FORMS_BY_ID_URL
            + "/organizations";
    public static final String FORM_ORGANIZATION_BY_ID_URL = FORM_ORGANIZATION_BASE_URL + "/{organizationId}";

    // JSONB object instantiated using config (rather than generic instance)
    private static Jsonb jsonb;

    @BeforeAll
    public static void init() {
        // following strategy is defined as default by internal API guidelines
        jsonb = new JsonBConfig().getContext(Void.class);
    }

    //
    // GET /form/{id}/contacts
    //
    @Test
    void getFormOrganizations_requireAuth() {
        // auth is triggered before CSRF (as the request is dumped before it gets
        // processed)
        given().auth().none().when().get(FORM_ORGANIZATION_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then()
                .statusCode(401);
    }

    @Test
    void getFormOrganizations_csrfGuard() {
        // happens after auth, once the request is processed
        given().auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet())).when()
                .get(FORM_ORGANIZATION_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().statusCode(403);
    }

    @Test
    void getFormOrganizations_success() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).when()
                .get(FORM_ORGANIZATION_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().statusCode(200);
    }

    @Test
    void getFormOrganizations_success_format() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).when()
                .get(FORM_ORGANIZATION_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().assertThat()
                .body(matchesJsonSchemaInClasspath(SchemaNamespaceHelper.ORGANIZATIONS_SCHEMA_PATH));
    }

    //
    // GET /form/{id}/contacts/{contactId}
    //
    @Test
    void getFormOrganizationByID_requireAuth() {
        // auth is triggered before CSRF (as the request is dumped before it gets
        // processed)
        given().auth().none().when().get(FORM_ORGANIZATION_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                FormOrganizationResourceTest.SAMPLE_ORGANIZATION_ID).then().statusCode(401);
    }

    @Test
    void getFormOrganizationByID_csrfGuard() {
        // happens after auth, once the request is processed
        given().auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet())).when().get(FORM_ORGANIZATION_BY_ID_URL,
                MembershipFormResourceTest.SAMPLE_FORM_UUID, FormOrganizationResourceTest.SAMPLE_ORGANIZATION_ID).then()
                .statusCode(403);
    }

    @Test
    void getFormOrganizationByID_success() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).when()
                .get(FORM_ORGANIZATION_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormOrganizationResourceTest.SAMPLE_ORGANIZATION_ID)
                .then().statusCode(200);
    }

    @Test
    void getFormOrganizationByID_success_format() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).when()
                .get(FORM_ORGANIZATION_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormOrganizationResourceTest.SAMPLE_ORGANIZATION_ID)
                .then().assertThat().body(matchesJsonSchemaInClasspath(SchemaNamespaceHelper.ORGANIZATION_SCHEMA_PATH))
                .statusCode(200);
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).accept(ContentType.JSON)
                .when()
                .get(FORM_ORGANIZATION_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormWorkingGroupsResourceTest.SAMPLE_WORKING_GROUPS_ID)
                .then().body(matchesJsonSchemaInClasspath(SchemaNamespaceHelper.ORGANIZATION_SCHEMA_PATH))
                .statusCode(200);

        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).accept(ContentType.XML)
                .when().get(FORM_ORGANIZATION_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormWorkingGroupsResourceTest.SAMPLE_WORKING_GROUPS_ID)
                .then().statusCode(500);
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).accept(ContentType.TEXT)
                .when().get(FORM_ORGANIZATION_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormWorkingGroupsResourceTest.SAMPLE_WORKING_GROUPS_ID)
                .then().statusCode(500);
    }

    //
    // POST /form/{id}/contacts
    //
    @Test
    void postFormOrganization_requireAuth() {
        // auth is triggered after CSRF for non GET requests
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).auth()
                .none().contentType(ContentType.JSON).body(generateSample(Optional.of(SAMPLE_ORGANIZATION_ID))).when()
                .post(FORM_ORGANIZATION_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().statusCode(401);
    }

    @Test
    void postFormOrganization_csrfGuard() {
        // happens after auth, once the request is processed
        given().auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet())).contentType(ContentType.JSON)
                .body(generateSample(Optional.of(SAMPLE_ORGANIZATION_ID))).when()
                .post(FORM_ORGANIZATION_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().statusCode(403);
    }

    @Test
    void postFormOrganization_success() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.JSON).body(generateSample(Optional.of(SAMPLE_ORGANIZATION_ID))).when()
                .post(FORM_ORGANIZATION_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().statusCode(200);
    }

    @Test
    void postFormOrganization_success_pushFormat() {
        // Check that the input matches what is specified in spec
        String json = generateSample(Optional.of(SAMPLE_ORGANIZATION_ID));
        Assertions.assertTrue(
                matchesJsonSchemaInClasspath(SchemaNamespaceHelper.ORGANIZATION_PUSH_SCHEMA_PATH).matches(json));

        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.JSON).body(json).when()
                .post(FORM_ORGANIZATION_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then()
                .body(matchesJsonSchemaInClasspath(SchemaNamespaceHelper.ORGANIZATIONS_SCHEMA_PATH)).statusCode(200);

        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).body(json).when()
                .post(FORM_ORGANIZATION_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().assertThat()
                .statusCode(500);
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.TEXT).body(json).when()
                .post(FORM_ORGANIZATION_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().statusCode(500);
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.XML).body(json).when()
                .post(FORM_ORGANIZATION_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().statusCode(500);
    }

    @Test
    void postFormOrganization_success_format() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.JSON).body(generateSample(Optional.of(SAMPLE_ORGANIZATION_ID))).when()
                .post(FORM_ORGANIZATION_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().assertThat()
                .body(matchesJsonSchemaInClasspath(SchemaNamespaceHelper.ORGANIZATIONS_SCHEMA_PATH));

        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .body(generateSample(Optional.of(SAMPLE_ORGANIZATION_ID))).when()
                .post(FORM_ORGANIZATION_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().statusCode(500);
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.TEXT).body(generateSample(Optional.of(SAMPLE_ORGANIZATION_ID))).when()
                .post(FORM_ORGANIZATION_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().statusCode(500);
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.XML).body(generateSample(Optional.of(SAMPLE_ORGANIZATION_ID))).when()
                .post(FORM_ORGANIZATION_BASE_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID).then().statusCode(500);
    }

    //
    // PUT /form/{id}/contacts/{contactId}
    //
    @Test
    void putFormOrganizationByID_requireAuth() {
        // auth is triggered after CSRF for non GET requests
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).auth()
                .none().contentType(ContentType.JSON).body(generateSample(Optional.of(SAMPLE_ORGANIZATION_ID))).when()
                .put(FORM_ORGANIZATION_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormOrganizationResourceTest.SAMPLE_ORGANIZATION_ID)
                .then().statusCode(401);
    }

    @Test
    void putFormOrganizationByID_csrfGuard() {
        // happens after auth, once the request is processed
        given().auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet())).contentType(ContentType.JSON)
                .body(generateSample(Optional.of(SAMPLE_ORGANIZATION_ID))).when()
                .put(FORM_ORGANIZATION_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormOrganizationResourceTest.SAMPLE_ORGANIZATION_ID)
                .then().statusCode(403);
    }

    @Test
    void putFormOrganizationByID_empty() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.JSON).when()
                .put(FORM_ORGANIZATION_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormOrganizationResourceTest.SAMPLE_ORGANIZATION_ID)
                .then().statusCode(500);
    }

    @Test
    void putFormOrganizationByID_success() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.JSON).body(generateSample(Optional.empty())).when()
                .put(FORM_ORGANIZATION_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormOrganizationResourceTest.SAMPLE_ORGANIZATION_ID)
                .then().statusCode(200);
    }

    @Test
    void putFormOrganizationByID_success_pushFormat() {
        SessionFilter sessionFilter = new SessionFilter();
        // Check that the input matches what is specified in spec
        String json = generateSample(Optional.empty());
        Assertions.assertTrue(
                matchesJsonSchemaInClasspath(SchemaNamespaceHelper.ORGANIZATION_PUSH_SCHEMA_PATH).matches(json));

        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.JSON).body(json).when()
                .put(FORM_ORGANIZATION_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormOrganizationResourceTest.SAMPLE_ORGANIZATION_ID)
                .then().statusCode(200);

        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).body(json).when()
                .put(FORM_ORGANIZATION_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormOrganizationResourceTest.SAMPLE_ORGANIZATION_ID)
                .then().statusCode(500);
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.TEXT).body(json).when()
                .put(FORM_ORGANIZATION_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormOrganizationResourceTest.SAMPLE_ORGANIZATION_ID)
                .then().statusCode(500);
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.XML).body(json).when()
                .put(FORM_ORGANIZATION_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormOrganizationResourceTest.SAMPLE_ORGANIZATION_ID)
                .then().statusCode(500);
    }

    @Test
    void putFormOrganizationByID_success_format() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.JSON).body(generateSample(Optional.of(SAMPLE_ORGANIZATION_ID))).when()
                .put(FORM_ORGANIZATION_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormOrganizationResourceTest.SAMPLE_ORGANIZATION_ID)
                .then().assertThat().body(matchesJsonSchemaInClasspath(SchemaNamespaceHelper.ORGANIZATIONS_SCHEMA_PATH))
                .statusCode(200);
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.JSON).body(generateSample(Optional.of(SAMPLE_ORGANIZATION_ID))).when()
                .put(FORM_ORGANIZATION_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormOrganizationResourceTest.SAMPLE_ORGANIZATION_ID)
                .then().body(matchesJsonSchemaInClasspath(SchemaNamespaceHelper.MEMBERSHIP_FORMS_SCHEMA_PATH))
                .statusCode(200);
        // asserts content type of output for integrity
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.JSON).accept(ContentType.TEXT)
                .body(generateSample(Optional.of(SAMPLE_ORGANIZATION_ID))).when()
                .put(FORM_ORGANIZATION_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormOrganizationResourceTest.SAMPLE_ORGANIZATION_ID)
                .then().statusCode(500);
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.JSON).accept(ContentType.XML)
                .body(generateSample(Optional.of(SAMPLE_ORGANIZATION_ID))).when()
                .put(FORM_ORGANIZATION_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormOrganizationResourceTest.SAMPLE_ORGANIZATION_ID)
                .then().statusCode(500);
    }

    @Test
    void deleteFormOrganizationByID_requireAuth() {
        // auth is triggered after CSRF for non GET requests
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).auth()
                .none().when()
                .delete("/form/{id}/contacts/{MembershipFormResourceTest.SAMPLE_FORM_UUID}",
                        MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormOrganizationResourceTest.SAMPLE_ORGANIZATION_ID)
                .then().statusCode(401);
    }

    @Test
    void deleteFormOrganizationByID_csrfGuard() {
        // happens after auth, once the request is processed
        given().auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet())).when()
                .delete(FORM_ORGANIZATION_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormOrganizationResourceTest.SAMPLE_ORGANIZATION_ID)
                .then().statusCode(403);
    }

    @Test
    void deleteFormOrganizationByID_success() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).when()
                .delete(FORM_ORGANIZATION_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormOrganizationResourceTest.SAMPLE_ORGANIZATION_ID)
                .then().statusCode(200);
    }

    @Test
    void deleteFormOrganizationByID_success_format() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).when()
                .delete(FORM_ORGANIZATION_BY_ID_URL, MembershipFormResourceTest.SAMPLE_FORM_UUID,
                        FormOrganizationResourceTest.SAMPLE_ORGANIZATION_ID)
                .then().assertThat().body(IsEmptyString.emptyString());
    }

    private FormOrganization generateSampleRaw(Optional<String> id) {
        FormOrganization out = new FormOrganization();
        id.ifPresent(out::setId);
        out.setLegalName("Sample Organization");
        out.setTwitterHandle("TwitterHandle");
        Address a = new Address();
        a.setCity("Sample");
        a.setCountry("Country");
        a.setPostalCode("Postal Code");
        a.setProvinceState("ON");
        a.setStreet("Sample street rd");
        out.setAddress(a);
        return out;
    }

    private String generateSample(Optional<String> id) {
        return FormOrganizationResourceTest.jsonb.toJson(generateSampleRaw(id));
    }
}
