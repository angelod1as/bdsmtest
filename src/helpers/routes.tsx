const ROOT_API_URL = process.env.ROOT_API_URL

const externalApiRoutes = {
  contact: `${ROOT_API_URL}/storecontact`,
  storeFeedback: `${ROOT_API_URL}/storefeedback`,
  feedback: `${ROOT_API_URL}/feedback`,
  login: `${ROOT_API_URL}/login`,
  register: `${ROOT_API_URL}/register`,
  forgotPassword: `${ROOT_API_URL}/forgotpass`,
  resetPassword: `${ROOT_API_URL}/resetpass`,
  changePassword: `${ROOT_API_URL}/passchange`,
  changeEmail: `${ROOT_API_URL}/changeemail`,
  getUserData: `${ROOT_API_URL}/getuserdata`,
  unclaim: `${ROOT_API_URL}/unclaim`,
  addClaim: `${ROOT_API_URL}/addclaim`,
  changeName: `${ROOT_API_URL}/changename`,
  myResults: `${ROOT_API_URL}/myresults`,
  questions: `${ROOT_API_URL}/questions`,
  score: `${ROOT_API_URL}/score`,
  storeRating: `${ROOT_API_URL}/storerating`,
  storeResultFeedback: `${ROOT_API_URL}/storeresultfeedback`,
  getResult: `${ROOT_API_URL}/getresult`,
  email: `${ROOT_API_URL}/email`,
}

export const ROUTES = {
  api: {
    contact: "/api/contact",
    login: "/api/login",
    register: "/api/register",
  },
  externalApi: {
    root: ROOT_API_URL,
    ...externalApiRoutes,
  },
  pages: {
    login: "/login",
    register: "/register",
    start: "/start",
    index: "/",
    info: "/info",
    contact: "/contact",
    profile: "/profile",
  },
}
