import { UserConfig } from "@farmfe/core";
import less from "@farmfe/js-plugin-less";

export default <UserConfig>{
  plugins: ["@farmfe/plugin-react", less()],
};
