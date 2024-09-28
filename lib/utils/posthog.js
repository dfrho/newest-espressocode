import posthog from 'posthog-js'

posthog.init('phc_izL4m5EjCN60v8wCZ5il08ji8YhQbNn2j1BdH4WceY2', {
  api_host: 'https://us.i.posthog.com',
  person_profiles: 'always', // or 'always' to create profiles for anonymous users as well
})
