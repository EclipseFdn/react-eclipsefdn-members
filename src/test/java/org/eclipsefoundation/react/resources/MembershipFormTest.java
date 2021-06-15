package org.eclipsefoundation.react.resources;

import io.quarkus.test.common.QuarkusTestResource;
import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.oidc.server.OidcWiremockTestResource;

@QuarkusTest
@QuarkusTestResource(OidcWiremockTestResource.class)
public class MembershipFormTest {

    void getForms_requireAuth(){

    }

    void getForms_csrfGuard(){

    }
}
