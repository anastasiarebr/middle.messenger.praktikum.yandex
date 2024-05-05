import { router } from './utils/Router'
import { login } from './pages/Login/index'
import { profile } from './pages/Profile/index'
import { signup } from './pages/Signup/index'
import { error } from './pages/Error/index'
import { chat } from './pages/Chat/index'
import { PATHS } from './consts'

router
  .use(PATHS.login, login)
  .use(PATHS.profile, profile)
  .use(PATHS.signup, signup)
  .use(PATHS.chat, chat)
  .use(PATHS.error, error('500'))
  .use(PATHS.all, error())
  .start();
