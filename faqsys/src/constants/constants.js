export const auth = {
  nonProdHost: 'https://oauth.iam.perf.target.com',
  prodHost: 'https://oauth.iam.target.com',
  nonProdLogoutHost: 'https://logonservices.iam.perf.target.com',
  prodLogoutHost: 'https://logonservices.iam.target.com',
  nonProdClientId: 'trellis_npe_im',
  prodClientId: 'trellis_prod_im',
  nonce: '1234',
}
export const serviceUrls = {
  local: 'http://localhost:8000/trellis-service',
  dev: 'https://trellisservice.dev.target.com/trellis-service',
  test: 'https://trellisservice-test.dev.target.com/trellis-service',
  stg: 'https://trellisservice-stg.prod.target.com/trellis-service',
  prod: 'https://trellisservice.prod.target.com/trellis-service',
}
export const mediaServiceUrls = {
  local: 'http://localhost:8080',
  dev: 'https://trellismediaservice.dev.target.com',
  test: 'https://trellismediaservice.dev.target.com',
  stg: 'https://trellismediaservice.prod.target.com',
  prod: 'https://trellismediaservice.prod.target.com',
}
export const articleStatusValues = {
  live: 'LIVE',
  draft: 'DRAFT',
}

export const charLimits = {
  titleCharLimit: 50,
  categoryCharLimit: 30,
  descriptionCharLimit: 100,
}

export const productImageLinks = {
  promotions: 'https://toss.target.com/Merch:trellis/ivy-promo-transparent.svg',
  pricing: 'https://toss.target.com/Merch:trellis-prod/1550549106||Z003CPV||pricing-transperent.png',
}
