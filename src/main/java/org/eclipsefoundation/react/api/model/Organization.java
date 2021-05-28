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
package org.eclipsefoundation.react.api.model;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class Organization {
    private Integer organizationID;
    private String name;
    private String memberType;
    private String shortDescription;
    private String companyUrl;
    private String smallLogo;
    private String largeLogo;
    private Map<String, WorkingGroupParticipationAgreement> wgpa;

    public Organization() {
    }

    public Organization(Integer organizationID, String name, String memberType, String shortDescription,
            String companyUrl, String smallLogo, String largeLogo,
            Map<String, WorkingGroupParticipationAgreement> wgpa) {
        this.organizationID = organizationID;
        this.name = name;
        this.memberType = memberType;
        this.shortDescription = shortDescription;
        this.companyUrl = companyUrl;
        this.smallLogo = smallLogo;
        this.largeLogo = largeLogo;
        this.wgpa = wgpa;
    }

    public Integer getOrganizationID() {
        return this.organizationID;
    }

    public void setOrganizationID(Integer organizationID) {
        this.organizationID = organizationID;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMemberType() {
        return this.memberType;
    }

    public void setMemberType(String memberType) {
        this.memberType = memberType;
    }

    public String getShortDescription() {
        return this.shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public String getCompanyUrl() {
        return this.companyUrl;
    }

    public void setCompanyUrl(String companyUrl) {
        this.companyUrl = companyUrl;
    }

    public String getSmallLogo() {
        return this.smallLogo;
    }

    public void setSmallLogo(String smallLogo) {
        this.smallLogo = smallLogo;
    }

    public String getLargeLogo() {
        return this.largeLogo;
    }

    public void setLargeLogo(String largeLogo) {
        this.largeLogo = largeLogo;
    }

    public Map<String, WorkingGroupParticipationAgreement> getWgpa() {
        return new HashMap<>(this.wgpa);
    }

    public void setWgpa(Map<String, WorkingGroupParticipationAgreement> wgpa) {
        this.wgpa = new HashMap<>(wgpa);
    }

    public Organization organizationID(Integer organizationID) {
        setOrganizationID(organizationID);
        return this;
    }

    public Organization name(String name) {
        setName(name);
        return this;
    }

    public Organization memberType(String memberType) {
        setMemberType(memberType);
        return this;
    }

    public Organization shortDescription(String shortDescription) {
        setShortDescription(shortDescription);
        return this;
    }

    public Organization companyUrl(String companyUrl) {
        setCompanyUrl(companyUrl);
        return this;
    }

    public Organization smallLogo(String smallLogo) {
        setSmallLogo(smallLogo);
        return this;
    }

    public Organization largeLogo(String largeLogo) {
        setLargeLogo(largeLogo);
        return this;
    }

    public Organization wgpas(Map<String, WorkingGroupParticipationAgreement> wgpa) {
        setWgpa(wgpa);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Organization)) {
            return false;
        }
        Organization organization = (Organization) o;
        return Objects.equals(organizationID, organization.organizationID) && Objects.equals(name, organization.name)
                && Objects.equals(memberType, organization.memberType)
                && Objects.equals(shortDescription, organization.shortDescription)
                && Objects.equals(companyUrl, organization.companyUrl)
                && Objects.equals(smallLogo, organization.smallLogo)
                && Objects.equals(largeLogo, organization.largeLogo) && Objects.equals(wgpa, organization.wgpa);
    }

    @Override
    public int hashCode() {
        return Objects.hash(organizationID, name, memberType, shortDescription, companyUrl, smallLogo, largeLogo, wgpa);
    }

    @Override
    public String toString() {
        return "{" + " organizationID='" + getOrganizationID() + "'" + ", name='" + getName() + "'" + ", memberType='"
                + getMemberType() + "'" + ", shortDescription='" + getShortDescription() + "'" + ", companyUrl='"
                + getCompanyUrl() + "'" + ", smallLogo='" + getSmallLogo() + "'" + ", largeLogo='" + getLargeLogo()
                + "'" + ", wgpas='" + getWgpa() + "'" + "}";
    }

    public static class WorkingGroupParticipationAgreement {
        private String documentID;
        private String relation;
        private String description;

        public WorkingGroupParticipationAgreement() {
        }

        public String getDocumentID() {
            return this.documentID;
        }

        public void setDocumentID(String documentID) {
            this.documentID = documentID;
        }

        public String getRelation() {
            return this.relation;
        }

        public void setRelation(String relation) {
            this.relation = relation;
        }

        public String getDescription() {
            return this.description;
        }

        public void setDescription(String description) {
            this.description = description;
        }
    }
}
