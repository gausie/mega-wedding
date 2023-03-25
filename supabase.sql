--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 15.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA "public";


ALTER SCHEMA "public" OWNER TO "postgres";

--
-- Name: SCHEMA "public"; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA "public" IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = "heap";

--
-- Name: guests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "public"."guests" (
    "id" bigint NOT NULL,
    "firstname" "text" NOT NULL,
    "email" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "considering" boolean,
    "lastname" "text" NOT NULL,
    "responded_at" timestamp with time zone,
    "member_of" bigint,
    "attending" boolean DEFAULT false NOT NULL,
    "plusOne" boolean DEFAULT false,
    "notes" "text"
);


ALTER TABLE "public"."guests" OWNER TO "postgres";

--
-- Name: international_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE "public"."guests" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."international_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: parties; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "public"."parties" (
    "id" bigint NOT NULL,
    "name" "text",
    "pin" "text" DEFAULT "substr"(("extensions"."uuid_generate_v4"())::"text", 0, 7) NOT NULL,
    "visited_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "international" boolean DEFAULT false NOT NULL
);


ALTER TABLE "public"."parties" OWNER TO "postgres";

--
-- Name: TABLE "parties"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE "public"."parties" IS 'Parties of guests';


--
-- Name: parties_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE "public"."parties" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."parties_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: parties_with_names; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW "public"."parties_with_names" AS
 SELECT "parties"."id",
    "parties"."name",
    "parties"."pin",
    "parties"."visited_at",
    "parties"."created_at",
    "parties"."international",
        CASE
            WHEN ("parties"."name" IS NULL) THEN ( SELECT "string_agg"("guests"."firstname", ', '::"text") AS "string_agg"
               FROM "public"."guests"
              WHERE ("guests"."member_of" = "parties"."id"))
            ELSE "parties"."name"
        END AS "generated_name"
   FROM "public"."parties";


ALTER TABLE "public"."parties_with_names" OWNER TO "postgres";

--
-- Name: std_form; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "public"."std_form" (
    "id" bigint NOT NULL,
    "firstname" "text" NOT NULL,
    "lastname" "text" NOT NULL,
    "email" "text" DEFAULT ''::"text",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."std_form" OWNER TO "postgres";

--
-- Name: TABLE "std_form"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE "public"."std_form" IS 'Temporary table for collecting email addresses for STDs';


--
-- Name: std_form_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE "public"."std_form" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."std_form_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: guests international_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."guests"
    ADD CONSTRAINT "international_pkey" PRIMARY KEY ("id");


--
-- Name: parties parties_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."parties"
    ADD CONSTRAINT "parties_pkey" PRIMARY KEY ("id");


--
-- Name: parties parties_token_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."parties"
    ADD CONSTRAINT "parties_token_key" UNIQUE ("pin");


--
-- Name: std_form std_form_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."std_form"
    ADD CONSTRAINT "std_form_pkey" PRIMARY KEY ("id");


--
-- Name: guests guests_member_of_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."guests"
    ADD CONSTRAINT "guests_member_of_fkey" FOREIGN KEY ("member_of") REFERENCES "public"."parties"("id");


--
-- Name: parties Allow Sam access; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow Sam access" ON "public"."parties" USING (("auth"."email"() = 'sam@gaus.co.uk'::"text"));


--
-- Name: guests Allow Sam acess; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow Sam acess" ON "public"."guests" TO "authenticated" USING (("auth"."email"() = 'sam@gaus.co.uk'::"text")) WITH CHECK (("auth"."email"() = 'sam@gaus.co.uk'::"text"));


--
-- Name: guests; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE "public"."guests" ENABLE ROW LEVEL SECURITY;

--
-- Name: parties; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE "public"."parties" ENABLE ROW LEVEL SECURITY;

--
-- Name: std_form; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE "public"."std_form" ENABLE ROW LEVEL SECURITY;

--
-- Name: SCHEMA "public"; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;
GRANT ALL ON SCHEMA "public" TO PUBLIC;
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";


--
-- Name: TABLE "guests"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE "public"."guests" TO "anon";
GRANT ALL ON TABLE "public"."guests" TO "authenticated";
GRANT ALL ON TABLE "public"."guests" TO "service_role";


--
-- Name: SEQUENCE "international_id_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE "public"."international_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."international_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."international_id_seq" TO "service_role";


--
-- Name: TABLE "parties"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE "public"."parties" TO "anon";
GRANT ALL ON TABLE "public"."parties" TO "authenticated";
GRANT ALL ON TABLE "public"."parties" TO "service_role";


--
-- Name: SEQUENCE "parties_id_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE "public"."parties_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."parties_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."parties_id_seq" TO "service_role";


--
-- Name: TABLE "parties_with_names"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE "public"."parties_with_names" TO "anon";
GRANT ALL ON TABLE "public"."parties_with_names" TO "authenticated";
GRANT ALL ON TABLE "public"."parties_with_names" TO "service_role";


--
-- Name: TABLE "std_form"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE "public"."std_form" TO "anon";
GRANT ALL ON TABLE "public"."std_form" TO "authenticated";
GRANT ALL ON TABLE "public"."std_form" TO "service_role";


--
-- Name: SEQUENCE "std_form_id_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE "public"."std_form_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."std_form_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."std_form_id_seq" TO "service_role";


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";


--
-- PostgreSQL database dump complete
--

