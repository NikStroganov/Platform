
package com.smartsearch.repo;

public final class SearchQueries {

    private SearchQueries() {
    }

    private static final String INPUT = """
            WITH search_input AS (
                SELECT CAST(:query AS text) AS q
            ), candidates AS (
            """;

    private static final String RANKING = """
            ), scored AS (
                SELECT c.id, c.name, c.term,
                       CASE
                           WHEN c.term = i.q THEN c.source_priority
                           WHEN char_length(i.q) >= :minimumPartialQueryLength
                                AND starts_with(c.term, i.q) THEN 2
                           WHEN char_length(i.q) >= :minimumPartialQueryLength
                                AND strpos(c.term, i.q) > 0 THEN 3
                           WHEN char_length(i.q) >= :minimumFuzzyQueryLength
                                AND public.similarity(c.term, i.q) >= :minimumSimilarity THEN 4
                           ELSE 5
                       END AS match_rank,
                       public.similarity(c.term, i.q) AS score
                FROM candidates c
                CROSS JOIN search_input i
                WHERE i.q <> ''
            ), ranked AS (
                SELECT id, name, match_rank, score,
                       row_number() OVER (
                           PARTITION BY id
                           ORDER BY match_rank ASC, score DESC, term ASC
                       ) AS match_number
                FROM scored
                WHERE match_rank < 5
            )
            SELECT id AS id, name AS name
            FROM ranked
            WHERE match_number = 1
            ORDER BY match_rank ASC, score DESC, name ASC, id ASC
            """;

    public static final String COMPANIES = INPUT + """
            SELECT e.id, e.name, a.alias AS term,
                   1 AS source_priority
            FROM public.companies e
            JOIN public.company_alias a ON a.company_id = e.id
            """ + RANKING;

    public static final String CITIES = INPUT + """
            SELECT e.id, e.name, a.alias AS term,
                   1 AS source_priority
            FROM public.cities e
            JOIN public.city_alias a ON a.city_id = e.id
            """ + RANKING;

    public static final String COUNTRIES = INPUT + """
            SELECT e.id, e.name, a.alias AS term,
                   1 AS source_priority
            FROM public.countries e
            JOIN public.country_alias a ON a.country_id = e.id
            """ + RANKING;

    public static final String PROFESSIONS = INPUT + """
            SELECT e.id, e.name, a.alias AS term,
                   1 AS source_priority
            FROM public.professions e
            JOIN public.profession_alias a ON a.profession_id = e.id
            """ + RANKING;

    public static final String SKILLS = INPUT + """
        SELECT e.id, e.name, a.alias AS term,
               1 AS source_priority
        FROM public.skills e
        JOIN public.skill_alias a ON a.skill_id = e.id
        """ + RANKING;
}