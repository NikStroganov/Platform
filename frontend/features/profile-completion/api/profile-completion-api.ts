import type {
  CatalogOptionDto,
  SearchRequest,
  SearchResult,
  TopCityDto,
  TopCompanyDto,
  TopProfessionDto,
} from "@/lib/api/gen/data-contracts";

const delay = async () => new Promise((resolve) => window.setTimeout(resolve, 160));

export type NicknameAvailability = {
  available: boolean;
};

const topProfessions: TopProfessionDto[] = [
  { professionId: "11111111-1111-4111-8111-111111111111", name: "Мобильный разработчик", backgroundColor: "#d8f1fb" },
  { professionId: "22222222-2222-4222-8222-222222222222", name: "Fullstack-разработчик", backgroundColor: "#d8f1fb" },
  { professionId: "33333333-3333-4333-8333-333333333333", name: "Frontend-разработчик", backgroundColor: "#d8f1fb" },
  { professionId: "44444444-4444-4444-8444-444444444444", name: "Backend-разработчик", backgroundColor: "#d8f1fb" },
  { professionId: "55555555-5555-4555-8555-555555555555", name: "Системный администратор", backgroundColor: "#f8d4c4" },
  { professionId: "66666666-6666-4666-8666-666666666666", name: "Графический дизайнер", backgroundColor: "#f8edc4" },
  { professionId: "77777777-7777-4777-8777-777777777777", name: "UX/UI Дизайнер", backgroundColor: "#f8edc4" },
  { professionId: "88888888-8888-4888-8888-888888888888", name: "QA-инженер (тестировщик)", backgroundColor: "#cdf8c4" },
  { professionId: "99999999-9999-4999-8999-999999999999", name: "DevOps-инженер", backgroundColor: "#cdf8c4" },
];

const topCompanies: TopCompanyDto[] = [
  { companyId: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa", name: "Вконтакте", logoKey: "/onboarding/company-vk.png", backgroundColor: "#ecf8fc" },
  { companyId: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb", name: "Сбербанк", logoKey: "/onboarding/company-sber.png", backgroundColor: "#eaf9ef" },
  { companyId: "cccccccc-cccc-4ccc-8ccc-cccccccccccc", name: "Дзен", logoKey: "/onboarding/company-dzen.png", backgroundColor: "#fbf1f1" },
  { companyId: "dddddddd-dddd-4ddd-8ddd-dddddddddddd", name: "OZON", logoKey: "/onboarding/company-ozon.png", backgroundColor: "#edf4ff" },
  { companyId: "eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee", name: "WildBerries", logoKey: "/onboarding/company-wildberries.png", backgroundColor: "#f8edf8" },
  { companyId: "ffffffff-ffff-4fff-8fff-ffffffffffff", name: "Самокат", logoKey: "/onboarding/company-samokat.png", backgroundColor: "#ecfaf7" },
];

const topCities: TopCityDto[] = [
  { cityId: "10000000-0000-4000-8000-000000000001", name: "Москва", backgroundColor: "#f3dddd" },
  { cityId: "10000000-0000-4000-8000-000000000002", name: "Санкт-Петербург", backgroundColor: "#dce9fa" },
  { cityId: "10000000-0000-4000-8000-000000000003", name: "Казань", backgroundColor: "#f8edc4" },
  { cityId: "10000000-0000-4000-8000-000000000004", name: "Нижний Новгород", backgroundColor: "#e1f8dd" },
];

const workFormats: CatalogOptionDto[] = [
  { code: "OFFICE", label: "Офис" },
  { code: "HYBRID", label: "Гибрид" },
  { code: "REMOTE", label: "Удаленно" },
];

const seniorityLevels: CatalogOptionDto[] = [
  { code: "INTERN", label: "Стажер" },
  { code: "JUNIOR", label: "Джун" },
  { code: "JUNIOR_PLUS", label: "Джун +" },
  { code: "MIDDLE", label: "Мидл" },
  { code: "MIDDLE_PLUS", label: "Мидл +" },
  { code: "SENIOR", label: "Сеньор" },
  { code: "EXPERT", label: "Эксперт" },
  { code: "LEAD", label: "Лид" },
  { code: "DIRECTOR", label: "Директор" },
];

const skills: SearchResult[] = [
  { id: "skill-figma", type: "SKILL", name: "Figma" },
  { id: "skill-react", type: "SKILL", name: "React" },
  { id: "skill-typescript", type: "SKILL", name: "TypeScript" },
  { id: "skill-css", type: "SKILL", name: "CSS" },
  { id: "skill-a11y", type: "SKILL", name: "Accessibility" },
  ...["Adobe Photoshop", "Гений дизайна", "Adobe Illustrator", "UX Research", "Прототипирование", "Дизайн-системы", "HTML", "JavaScript", "Node.js", "SQL", "Git", "Docker", "Python", "Java", "Kotlin", "Swift", "Go", "Kubernetes", "GraphQL", "REST API", "Тестирование", "Аналитика"].map<SearchResult>((name, index) => ({
    id: `30000000-0000-4000-8000-${String(index + 1).padStart(12, "0")}`,
    type: "SKILL",
    name,
  })),
];

function matchesQuery(name: string | undefined, query: string) {
  return (name ?? "").toLowerCase().includes(query.trim().toLowerCase());
}

export async function getTopProfessionsMock(): Promise<TopProfessionDto[]> {
  // TODO: Replace with api.getTopProfessions() when backend data is ready for onboarding.
  await delay();
  return topProfessions;
}

export async function getTopCompaniesMock(): Promise<TopCompanyDto[]> {
  // TODO: Replace with api.getTopCompanies() when backend data is ready for onboarding.
  await delay();
  return topCompanies;
}

export async function getTopCitiesMock(): Promise<TopCityDto[]> {
  // TODO: Replace with api.getTopCities() when backend data is ready for onboarding.
  await delay();
  return topCities;
}

export async function getWorkFormatsMock(): Promise<CatalogOptionDto[]> {
  // TODO: Replace with api.getWorkFormats() when backend data is ready for onboarding.
  await delay();
  return workFormats;
}

export async function getSeniorityLevelsMock(): Promise<CatalogOptionDto[]> {
  // TODO: Replace with api.getSeniorityLevels() when backend data is ready for onboarding.
  await delay();
  return seniorityLevels;
}

export async function searchCatalogMock(request: SearchRequest): Promise<SearchResult[]> {
  // TODO: Replace with api.search({ request }) when backend search is ready for onboarding.
  await delay();

  const query = request.query ?? "";
  const fromTopProfessions = topProfessions.map<SearchResult>((item) => ({
    id: item.professionId,
    type: "PROFESSION",
    name: item.name,
  }));
  const fromTopCompanies = topCompanies.map<SearchResult>((item) => ({
    id: item.companyId,
    type: "COMPANY",
    name: item.name,
  }));
  const fromCountries: SearchResult[] = [
    { id: "20000000-0000-4000-8000-000000000001", type: "COUNTRY", name: "Россия" },
    { id: "20000000-0000-4000-8000-000000000002", type: "COUNTRY", name: "Казахстан" },
    { id: "20000000-0000-4000-8000-000000000003", type: "COUNTRY", name: "Беларусь" },
    { id: "20000000-0000-4000-8000-000000000004", type: "COUNTRY", name: "Армения" },
  ];
  const fromTopCities = topCities.map<SearchResult>((item) => ({ id: item.cityId, type: "CITY", name: item.name }));

  const sourceByType: Record<SearchRequest["type"], SearchResult[]> = {
    COMPANY: fromTopCompanies,
    SKILL: skills,
    PROFESSION: fromTopProfessions,
    COUNTRY: fromCountries,
    CITY: fromTopCities,
  };

  return sourceByType[request.type].filter((item) => matchesQuery(item.name, query)).slice(0, request.size ?? 10);
}

export async function checkNicknameAvailabilityMock(nickname: string): Promise<NicknameAvailability> {
  // TODO: Replace with a real nickname availability endpoint when it appears in generated API.
  await delay();
  return { available: !["skannek", "admin", "careit"].includes(nickname.trim().toLowerCase()) };
}
