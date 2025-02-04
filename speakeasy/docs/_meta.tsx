import { SidebarSeparator } from "~/components/SidebarSeparator";
import { HomeIcon } from "~/icons/src/HomeIcon";

const Title = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center">{children}</div>
);

export default {
  index: {
    title: (
      <Title>
        <HomeIcon width={16} height={15} className="mr-2" />
        Home
      </Title>
    ),
    theme: {
      layout: "overview",
      toc: false,
    },
  },
  /* 
    Quickstart 
  */
  "quickstart-section": {
    type: "separator",
    title: <SidebarSeparator>Quickstart</SidebarSeparator>,
  },
  introduction: {
    title: "Introduction",
  },
  "api-devex": {
    title: "Why API DevEx?",
  },
  "core-concepts": {
    title: "Core Concepts",
  },
  /* 
    SDK 
  */
  "sdk-section": {
    type: "separator",
    title: <SidebarSeparator>SDK</SidebarSeparator>,
  },
  "prep-openapi": {
    title: "Prep OpenAPI Spec",
  },
  "create-client-sdks": {
    title: "Generate SDK",
  },
  customize: {
    title: "Customize",
  },
  manage: {
    title: "Manage",
  },
  "publish-sdk": {
    title: "Publish SDK",
  },
  languages: {
    title: "Language Design",
  },
  /* 
    Terraform 
  */
  "terraform-section": {
    type: "separator",
    title: <SidebarSeparator>Terraform Provider</SidebarSeparator>,
  },
  "create-terraform": {
    title: "Generate Terraform Provider",
  },
  "publish-terraform": {
    title: "Publish Terraform Provider",
  },
  terraform: {
    title: "Terraform Extensions",
  },
  /* 
    Testing 
  */
  "testing-section": {
    type: "separator",
    title: <SidebarSeparator>Testing [Early Access]</SidebarSeparator>,
  },
  testing: {
    title: "Start Testing",
  },
  "customize-testing": {
    title: "Configure Testing",
  },
  /* 
    Docs 
  */
  "docs-section": {
    type: "separator",
    title: <SidebarSeparator>Documentation</SidebarSeparator>,
  },
  "sdk-docs": {
    title: "Customize SDK Documentation",
  },
  "code-samples": {
    title: "Code Samples",
  },
  integrations: {
    title: "Integrations",
  },
  /* 
    Reference 
  */
  "ref-section": {
    type: "separator",
    title: <SidebarSeparator>Reference</SidebarSeparator>,
  },
  "speakeasy-reference": {
    title: "Speakeasy",
  },
  supported: {
    title: "Supported",
  },
  "code-examples": {
    title: "Code Examples",
    href: "/examples",
  },
  /* 
    Support
  */
  "support-section": {
    type: "separator",
    title: <SidebarSeparator>Support</SidebarSeparator>,
  },
  "slack-community": {
    title: "Slack Community",
    href: "https://join.slack.com/t/speakeasy-dev/shared_invite/zt-1cwb3flxz-lS5SyZxAsF_3NOq5xc8Cjw",
    newWindow: true,
  },
  "enterprise-support": {
    title: "Enterprise Support",
  },
  /* 
    Privacy & Security
  */
  "privacy-security-section": {
    type: "separator",
    title: <SidebarSeparator>Privacy & Security</SidebarSeparator>,
  },
  "product-security": {
    title: "Product Security",
  },
  "privacy-policy": {
    title: "Privacy Policy",
  },
  "terms-of-service": {
    title: "Terms of Service",
  },
};
