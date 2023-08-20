import { ABOUT_ROUTE, CONTACT_ROUTE } from "@shared/consts";
import { Container, Link, Title } from "@shared/ui";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use - GameHub",
  description: "GameHub Terms of Use",
};

export default async function TermsPage() {
  return (
    <section className="text-sm md:text-base">
      <Container>
        <Title size="large">Terms of Use</Title>
        <p className="italic mb-3">Last updated: August 20, 2023</p>
        <Title>Agreement to Terms</Title>
        <p className="mb-3">
          These Terms of Use constitute a legally binding agreement made between
          you, whether personally or on behalf of an entity (&quot;you”) and
          Mediajoy, Inc.(&quot;Company&quot;, &quot;we”, &quot;us”, or
          &quot;our”), concerning your access to and use of the SITE_LINK
          website as well as any other media form, media channel, mobile website
          or mobile application related, linked, or otherwise connected thereto
          (collectively, the &quot;Site”). You agree that by accessing the Site,
          you have read, understood, and agree to be bound by all of these Terms
          of Use. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF USE, THEN YOU
          ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE
          USE IMMEDIATELY.
        </p>
        <p className="mb-3">
          Supplemental terms and conditions or documents that may be posted on
          the Site from time to time are hereby expressly incorporated herein by
          reference. We reserve the right, in our sole discretion, to make
          changes or modifications to these Terms of Use at any time and for any
          reason. We will alert you about any changes by updating the &quot;Last
          updated” date of these Terms of Use, and you waive any right to
          receive specific notice of each such change. It is your responsibility
          to periodically review these Terms of Use to stay informed of updates.
          You will be subject to, and will be deemed to have been made aware of
          and to have accepted, the changes in any revised Terms of Use by your
          continued use of the Site after the date such revised Terms of Use are
          posted.
        </p>
        <p className="mb-3">
          The Site is intended for users who are at least 18 years old. Persons
          under the age of 18 are not permitted to use orregister for the Site.
        </p>
        <Title>User Representations</Title>
        <p className="mb-3">
          By using the Site, you represent and warrant that: (1)all registration
          information you submit will be true, accurate, current, and complete;
          (2) you will maintain the accuracy of such information and promptly
          update such registration information as necessary; (3) you have the
          legal capacity and you agree to comply with these Terms of Use; (4)
          you are not a minor in the jurisdiction in which you reside;(5) you
          will not access the Site through automated or non-human means, whether
          through a bot, script or otherwise;(6) you will not use the Site for
          any illegal or unauthorized purpose; and (7) your use of the Site will
          not violate any applicable law or regulation.
        </p>
        <p className="mb-3">
          If you provide any information that is untrue, inaccurate, not
          current, or incomplete, we have the right to suspend or terminate your
          account and refuse any and all current or future use of the Site (or
          any portion thereof).
        </p>
        <Title>User Registration</Title>
        <p className="mb-3">
          You may be required to register with the Site. You agree to keep your
          password confidential and will be responsible for all use of your
          account and password. We reserve the right to remove, reclaim, or
          change a username you select if we determine, in our sole discretion,
          that such username is inappropriate, obscene, or otherwise
          objectionable.
        </p>
        <Title>Prohibited Activities</Title>
        <p className="mb-3">
          You may not access or use the Site for any purpose other than that for
          which we make the Site available. The Site may not be used in
          connection with any commercial endeavors except those that are
          specifically endorsed or approved by us.
        </p>
        <p className="mb-3">As a user of the Site, you agree not to:</p>
        <ul className="mb-3 list-disc">
          <li>
            Systematically retrieve data or other content from the Site to
            create or compile, directly or indirectly, a collection,
            compilation, database, or directory without written permission from
            us.
          </li>
          <li>
            Make any unauthorized use of the Site, including collecting
            usernames and/or email addresses of users by electronic or other
            means for the purpose of sending unsolicited email, or creating user
            accounts by automated means or under false pretenses.
          </li>
          <li>
            Use the Site to advertise or offer to sell goods and services.
          </li>
          <li>
            Use a buying agent or purchasing agent to make purchases on the
            Site.
          </li>
          <li>
            Circumvent, disable, or otherwise interfere with security-related
            features of the Site, including features that prevent or restrict
            the use or copying of any Content or enforce limitations on the use
            of the Site and/or the Content contained therein.
          </li>
          <li>Engage in unauthorized framing of or linking to the Site.</li>
          <li>
            Trick, defraud, or mislead us and other users, especially in any
            attempt to learn sensitive account information such as user
            passwords.
          </li>
          <li>
            Engage in any automated use of the system, such as using scripts to
            send comments or messages, or using any data mining, robots, or
            similar data gathering and extraction tools.
          </li>
          <li>
            Interfere with, disrupt, or create an undue burden on the Site or
            the networks or services connected to the Site.
          </li>
          <li>
            {" "}
            Attempt to impersonate another user or person or use the username of
            another user.
          </li>
          <li>Sell or otherwise transfer your profile.</li>
          <li>
            Use any information obtained from the Site in order to harass,
            abuse, or harm another person.
          </li>
          <li>
            Copy or adapt the Site&apos;s software, including but not limited to
            Flash, PHP, HTML, JavaScript, or other code.
          </li>
          <li>
            Upload or transmit (or attempt to upload or to transmit) viruses,
            Trojan horses, or other material, including excessive use of capital
            letters and spamming (continuous posting of repetitive text), that
            interferes with any party&apos;s uninterrupted use and enjoyment of
            the Site or modifies, impairs, disrupts, alters, or interferes with
            the use, features, functions, operation, or maintenance of the Site.
          </li>
          <li>
            Upload or transmit (or attempt to upload or to transmit) any
            material that acts as a passive or active information collection or
            transmission mechanism, including without limitation, clear graphics
            interchange formats (&quot;gifs”), 1x1 pixels, web bugs, cookies, or
            other similar devices (sometimes referred to as &quot;spyware” or
            &quot;passive collection mechanisms” or &quot;pcms”).
          </li>
          <li>
            Use the Site in a manner inconsistent with any applicable laws or
            regulations.
          </li>
        </ul>
        <Title>GameHub Content</Title>
        <p className="mb-3">
          GameHub sources video game data from IGDB. More information can be
          found on our <Link href={ABOUT_ROUTE}>About page. </Link>
          IGDB utilizes crowdsourcing for data contributions. We do our best to
          present the data exactly as we receive it from these sources. If you
          notice any mistakes, errors, or have any issues with the data, you may
          edit the data through the respective sources. We reserve the right to
          modify or fix any of that data at any time.
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
