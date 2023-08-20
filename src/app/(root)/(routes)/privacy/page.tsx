import { CONTACT_ROUTE } from "@shared/consts";
import { Container, ExternalLink, Link, Title } from "@shared/ui";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - GameHub",
  description: "GameHub Privacy Policy",
};

export default async function PrivacyPage() {
  return (
    <section className="text-sm md:text-base">
      <Container>
        <Title size="large">Privacy Policy</Title>
        <p className="italic mb-3">Last updated: August 20, 2023</p>
        <p className="mb-3">
          This Privacy Policy is part of our Terms of Use. Any words defined in
          the Terms of Use have the same meaning in this Privacy Policy.
        </p>
        <p className="mb-3">
          We seek to minimize the amount of personal information that we collect
          and store. We are not interested in advertising or building predatory
          &quot;profiles&quot; of our visitors. Any information we do collect is
          only used to operate GameHub, provide paid services, and make informed
          decisions about how to improve GameHub. We also don&apos;t sell or
          trade visitor information with other companies.
        </p>
        <p className="mb-3">
          We may modify this Privacy Policy at any time and subsequently revise
          the &quot;Last updated&quot; date at the top of this page. Your access
          to and use of GameHub is always subject to the current Privacy Policy.
          If you do not agree to the new Privacy Policy, you must either stop
          using GameHub or delete your account.
        </p>
        <p className="mb-3">
          This document provides details about what kind of data GameHub gathers
          and how we manage and protect it.
        </p>
        <Title>Consent</Title>
        <p className="mb-3">
          By accessing or using GameHub, you consent to our practices described
          in this Privacy Policy. If you do not agree with this Privacy Policy,
          do not access or use GameHub.
        </p>
        <Title>Cookies and Browser Data</Title>
        <p className="mb-3">
          GameHub has features that require us to remember your preferences and
          identify who is logged in to our applications. We use a combination of{" "}
          <ExternalLink href="https://en.wikipedia.org/wiki/HTTP_cookie">
            browser cookies
          </ExternalLink>{" "}
          and your browser&apos;s{" "}
          <ExternalLink href="https://en.wikipedia.org/wiki/Web_storage">
            local storage
          </ExternalLink>
          to track this information.
        </p>
        <p className="mb-3">
          Account identifiers in cookies are encrypted, and we do not store any
          sensitive information in local storage. We only set these items when
          you specifically log in to the site or change your preferences.
        </p>
        <Title size="small">Clear website data</Title>
        <p className="mb-2">
          If you no longer want this information on your device, you can clear
          your history and cookies:
        </p>
        <ul className="mb-3 list-disc">
          <li>
            <ExternalLink href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox?redirectslug=delete-cookies-remove-info-websites-stored&redirectlocale=en-US">
              Mozilla Firefox
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd">
              Microsoft Edge
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://support.apple.com/en-us/HT201265">
              Safari on iOS
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac">
              Safari on Mac
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://support.google.com/accounts/answer/32050?co=GENIE.Platform%3DAndroid">
              Chrome on Android
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://support.google.com/accounts/answer/32050?co=GENIE.Platform%3DiOS">
              Chrome on iOS
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://support.google.com/accounts/answer/32050?co=GENIE.Platform%3DAndroid">
              Chrome on Desktop
            </ExternalLink>
          </li>
        </ul>
        <Title>Children&apos;s Privacy</Title>
        <p className="mb-3">
          GameHub is not intended for children under the age of 18. We do not
          knowingly collect personal information from children under 18. If you
          are a parent or guardian and believe that your child has used GameHub
          and/or provided us with personal information, please contact us.
        </p>
        <Title>GameHub Accounts</Title>
        <p className="mb-3">
          You can register for a GameHub account in order to use personalized or
          exclusive features. If you do, the information in this section applies
          to you.
        </p>
        <Title size="small">Personal information</Title>
        <p className="mb-3">
          In order to open an account, you will need to provide us with some
          required information, including a username and email address. None of
          this information needs to contain your legal name.
        </p>
        <p className="mb-3">
          GameHub uses this information to provide you with account services and
          communicate changes made to your account. Creating an account is
          optional, and you do not need to provide any personal information to
          GameHub.
        </p>
        <Title size="small">Data privacy</Title>
        <p className="mb-3">
          Your email address is private. Your username, avatar, and library data
          is public. They may be visible to other people who use GameHub.
        </p>
        <Title size="small">Email policy</Title>
        <p className="mb-3">
          GameHub will only send you critical emails. For example, you may
          receive a message when you register, change account settings, or log
          in to the site. If you no longer wish to receive account-related
          emails, you may delete your account. GameHub does not have a
          &quot;newsletter&quot; or other marketing email lists.
        </p>
        <Title size="small">Social Logins</Title>
        <p className="mb-3">
          Our Services offers you the ability to register and login using your
          third-party social media account details (like your Google or Twitch
          logins). Where you choose to do this, we will receive certain profile
          information about you from your social media provider. The profile
          information we receive may vary depending on the social media provider
          concerned, but will often include your name, email address, friends
          list, profile picture as well as other information you choose to make
          public on such social media platform.
        </p>
        <p className="mb-3">
          We will use the information we receive only for the purposes that are
          described in this privacy notice or that are otherwise made clear to
          you on the relevant Services. Please note that we do not control, and
          are not responsible for, other uses of your personal information by
          your third-party social media provider. We recommend that you review
          their privacy notice to understand how they collect, use and share
          your personal information, and how you can set your privacy
          preferences on their sites and apps.
        </p>
        <Title size="small">Data privacy</Title>
        <p className="mb-3">
          GameHub stores account and system data on{" "}
          <ExternalLink href="https://planetscale.com/legal/privacy">
            PlanetScale
          </ExternalLink>
        </p>
        <p className="mb-3">
          In order to investigate and troubleshoot account issues, GameHub
          administrators have access to the database and account data. When team
          members no longer need this level of access, we revoke it, even if
          that person otherwise remains a part of the GameHub team.
        </p>
        <Title size="small">Sign out</Title>
        <p className="mb-3">
          You can sign out of the GameHub website by clicking on your avatar and
          then clicking &quot;Sign out&quot;.
        </p>
        <Title>Questions</Title>
        <p className="mb-3">
          If you have questions or concerns about this privacy information,
          please don&apos;t hesitate to{" "}
          <Link href={CONTACT_ROUTE}>contact us.</Link>
        </p>
      </Container>
    </section>
  );
}
