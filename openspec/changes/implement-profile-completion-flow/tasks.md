## 1. Route and Module Setup

- [x] 1.1 Create the protected onboarding/profile completion route in the frontend app router.
- [x] 1.2 Create the `features/profile-completion` module structure for UI, model, api adapters, and steps.
- [x] 1.3 Wire the route to render the profile completion flow inside existing app providers and auth guard.

## 2. Flow Layout and Navigation

- [x] 2.1 Implement the shared profile completion screen layout with logo, progress area, content slot, and bottom CTA area.
- [x] 2.2 Compose existing design-system components for the shell, including `AppStepper` and `AppButton`.
- [x] 2.3 Implement declarative step configuration with stable step ids, order, progress visibility, and per-step metadata.
- [x] 2.4 Implement next/back navigation that preserves current-session form state between steps.
- [x] 2.5 Implement upper stepper navigation between available steps with the same availability rules as CTA navigation.
- [x] 2.6 Implement disabled/loading/error states for navigation, upper stepper, and primary CTA behavior.

## 3. State and DTO Mapping

- [x] 3.1 Define the centralized profile completion state type, including form values, selected ids, display metadata, and optional-field toggles.
- [x] 3.2 Implement state update helpers or reducer for step-level changes.
- [x] 3.3 Implement `buildOnboardingDto` to map UI state to generated `OnboardingDto`.
- [x] 3.4 Validate required fields and numeric ranges before allowing final submit.
- [x] 3.5 Ensure draft state is not persisted to localStorage or sessionStorage.

## 4. API Adapters

- [x] 4.1 Add temporary mock adapter functions for top professions, top companies, and top cities returning generated DTO-like data, with TODO markers for real API replacement.
- [x] 4.2 Add temporary mock adapter functions for work formats and seniority levels returning `CatalogOptionDto`-like data, with TODO markers for real API replacement.
- [x] 4.3 Add a temporary mock search adapter for company, skill, profession, country, and city lookups returning `SearchResult`-like data, with TODO markers for real API replacement.
- [x] 4.4 Add a mock nickname availability API-call with a result shape isolated from UI components.
- [x] 4.5 Normalize all API responses into UI option shapes before passing data to design-system components.

## 5. Step Implementation

- [x] 5.1 Implement the intro/anonymity step from Figma node `2031:5312`.
- [x] 5.2 Implement the nickname step, including default, filled, and nickname-taken states.
- [x] 5.3 Implement professional selection steps using existing speciality/profession UI components and search/top-list data.
- [x] 5.4 Implement company selection steps using existing company UI components and search/top-list data.
- [x] 5.5 Implement country/city/work-format selection steps using existing city/switch/search components.
- [x] 5.6 Implement seniority and work experience steps using `GradeSelect`, `FieldInput`, and optional company grade toggle.
- [x] 5.7 Implement salary and bonus steps using currency selection, salary input, bonus toggle, and optional bonus input.
- [x] 5.8 Implement skills selection using `ChipInput`, generated search data, and related skill suggestions.
- [x] 5.9 Implement the final review step with summary data and editable current-session values.
- [x] 5.10 Treat duplicate Figma frames as states of the relevant step rather than separate steps.

## 6. Submission and Completion

- [x] 6.1 Connect the final CTA to `api.saveOnboarding` with the built `OnboardingDto`.
- [x] 6.2 Show submit loading and failure states without clearing current-session state.
- [x] 6.3 Handle successful completion with the current minimal post-submit navigation.
- [x] 6.4 Keep global onboarding redirect out of scope until a separate onboarding status exists.

## 7. Verification

- [ ] 7.1 Verify the shared layout and step navigation against Figma node `2031:5312`.
- [ ] 7.2 Verify each implemented step against its relevant Figma state, including error and optional-field states.
- [x] 7.3 Run frontend lint/type checks for changed files.
- [ ] 7.4 Add focused tests or story coverage for state mapping, nickname mock behavior, and DTO construction where practical.
- [ ] 7.5 Confirm `openspec status --change implement-profile-completion-flow` reports all artifacts complete before implementation begins.




