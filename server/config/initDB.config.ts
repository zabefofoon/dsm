import "./setEnv.config"
import {typeORMConfig} from "./typeorm.config"
import {createDatabase} from "typeorm-extension"

(async () => {
  await createDatabase({
    options: typeORMConfig,
    ifNotExist: true
  });
  process.exit(0);
})();