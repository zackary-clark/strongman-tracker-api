--
-- PostgreSQL database dump
--

-- Dumped from database version 14.10 (Debian 14.10-1.pgdg120+1)
-- Dumped by pg_dump version 14.10 (Debian 14.10-1.pgdg120+1)

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
-- Name: day_of_week; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.day_of_week AS ENUM (
    'mon',
    'tue',
    'wed',
    'thu',
    'fri',
    'sat',
    'sun'
);


ALTER TYPE public.day_of_week OWNER TO postgres;

--
-- Name: length_unit; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.length_unit AS ENUM (
    'cm',
    'in'
);


ALTER TYPE public.length_unit OWNER TO postgres;

--
-- Name: max_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.max_type AS ENUM (
    'deadlift',
    'press',
    'bench',
    'squat'
);


ALTER TYPE public.max_type OWNER TO postgres;

--
-- Name: muscle_group; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.muscle_group AS ENUM (
    'abs',
    'biceps',
    'butt',
    'calves',
    'chest',
    'forearms',
    'hamstrings',
    'lowerBack',
    'quads',
    'shoulders',
    'traps',
    'triceps',
    'upperBack'
);


ALTER TYPE public.muscle_group OWNER TO postgres;

--
-- Name: weight_unit; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.weight_unit AS ENUM (
    'kg',
    'lb'
);


ALTER TYPE public.weight_unit OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: exercise; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exercise (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    focus_groups public.muscle_group[],
    custom boolean DEFAULT true NOT NULL,
    user_id character varying(255),
    CONSTRAINT custom_or_global_exercise_constraint CHECK ((((user_id IS NOT NULL) AND (custom = true)) OR ((user_id IS NULL) AND (custom = false))))
);


ALTER TABLE public.exercise OWNER TO postgres;


--
-- Name: lift; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lift (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    workout uuid NOT NULL,
    name character varying(255),
    reps integer,
    sets integer,
    weight integer,
    user_id character varying(255) NOT NULL
);


ALTER TABLE public.lift OWNER TO postgres;

--
-- Name: max; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.max (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    date date NOT NULL,
    user_id character varying(255) NOT NULL,
    weight integer NOT NULL,
    type public.max_type NOT NULL
);


ALTER TABLE public.max OWNER TO postgres;

--
-- Name: program; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.program (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    description text
);


ALTER TABLE public.program OWNER TO postgres;

--
-- Name: programmed_exercise; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.programmed_exercise (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id character varying(255) NOT NULL,
    programmed_workout uuid NOT NULL,
    exercise uuid NOT NULL,
    "order" integer,
    protocol json,
    training_max integer
);


ALTER TABLE public.programmed_exercise OWNER TO postgres;

--
-- Name: programmed_workout; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.programmed_workout (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id character varying(255) NOT NULL,
    program uuid NOT NULL,
    name character varying(255) NOT NULL,
    "order" integer,
    description text,
    focus_groups public.muscle_group[],
    day public.day_of_week
);


ALTER TABLE public.programmed_workout OWNER TO postgres;

--
-- Name: user_exercise_unit; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_exercise_unit (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id character varying(255) NOT NULL,
    exercise uuid NOT NULL,
    weight_unit public.weight_unit,
    length_unit public.length_unit
);


ALTER TABLE public.user_exercise_unit OWNER TO postgres;

--
-- Name: user_preferences; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_preferences (
    id character varying(255) NOT NULL,
    weight_unit public.weight_unit DEFAULT 'kg'::public.weight_unit NOT NULL,
    length_unit public.length_unit DEFAULT 'cm'::public.length_unit NOT NULL
);


ALTER TABLE public.user_preferences OWNER TO postgres;

--
-- Name: workout; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workout (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    date date NOT NULL,
    user_id character varying(255) NOT NULL
);


ALTER TABLE public.workout OWNER TO postgres;


--
-- Name: exercise exercise_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise
    ADD CONSTRAINT exercise_pkey PRIMARY KEY (id);


--
-- Name: lift lift_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lift
    ADD CONSTRAINT lift_pkey PRIMARY KEY (id);


--
-- Name: max max_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.max
    ADD CONSTRAINT max_pkey PRIMARY KEY (id);


--
-- Name: program program_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program
    ADD CONSTRAINT program_pkey PRIMARY KEY (id);


--
-- Name: programmed_exercise programmed_exercise_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.programmed_exercise
    ADD CONSTRAINT programmed_exercise_pkey PRIMARY KEY (id);


--
-- Name: programmed_workout programmed_workout_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.programmed_workout
    ADD CONSTRAINT programmed_workout_pkey PRIMARY KEY (id);


--
-- Name: user_exercise_unit user_exercise_unit_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_exercise_unit
    ADD CONSTRAINT user_exercise_unit_pkey PRIMARY KEY (id);


--
-- Name: user_exercise_unit user_exercise_unit_user_id_exercise_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_exercise_unit
    ADD CONSTRAINT user_exercise_unit_user_id_exercise_unique UNIQUE (user_id, exercise);


--
-- Name: user_preferences user_preferences_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_preferences
    ADD CONSTRAINT user_preferences_pkey PRIMARY KEY (id);


--
-- Name: workout workout_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workout
    ADD CONSTRAINT workout_pkey PRIMARY KEY (id);


--
-- Name: exercise_custom_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX exercise_custom_index ON public.exercise USING btree (custom);


--
-- Name: exercise_user_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX exercise_user_id_index ON public.exercise USING btree (user_id);


--
-- Name: lift_workout_user_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lift_workout_user_id_index ON public.lift USING btree (workout, user_id);


--
-- Name: max_user_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX max_user_id_index ON public.max USING btree (user_id);


--
-- Name: program_user_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX program_user_id_index ON public.program USING btree (user_id);


--
-- Name: programmed_exercise_user_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX programmed_exercise_user_id_index ON public.programmed_exercise USING btree (user_id);


--
-- Name: programmed_workout_user_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX programmed_workout_user_id_index ON public.programmed_workout USING btree (user_id);


--
-- Name: programmed_workout_user_id_program_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX programmed_workout_user_id_program_index ON public.programmed_workout USING btree (user_id, program);


--
-- Name: workout_user_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workout_user_id_index ON public.workout USING btree (user_id);


--
-- Name: lift lift_workout_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lift
    ADD CONSTRAINT lift_workout_foreign FOREIGN KEY (workout) REFERENCES public.workout(id);


--
-- Name: programmed_exercise programmed_exercise_exercise_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.programmed_exercise
    ADD CONSTRAINT programmed_exercise_exercise_foreign FOREIGN KEY (exercise) REFERENCES public.exercise(id);


--
-- Name: programmed_exercise programmed_exercise_programmed_workout_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.programmed_exercise
    ADD CONSTRAINT programmed_exercise_programmed_workout_foreign FOREIGN KEY (programmed_workout) REFERENCES public.programmed_workout(id);


--
-- Name: programmed_workout programmed_workout_program_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.programmed_workout
    ADD CONSTRAINT programmed_workout_program_foreign FOREIGN KEY (program) REFERENCES public.program(id);


--
-- Name: user_exercise_unit user_exercise_unit_exercise_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_exercise_unit
    ADD CONSTRAINT user_exercise_unit_exercise_foreign FOREIGN KEY (exercise) REFERENCES public.exercise(id);


--
-- PostgreSQL database dump complete
--

