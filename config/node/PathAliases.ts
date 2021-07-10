const pathUtility = require("path");

export const PathAliases = {
  Components: pathUtility.resolve("./src/Components"),
  DataTypes: pathUtility.resolve("./src/DataTypes"),
  Fields: pathUtility.resolve("./src/Fields"),
  Utility: pathUtility.resolve("./src/Utility"),
  Libraries: pathUtility.resolve("./web/libraries"),
  FrontEndTheme: pathUtility.resolve("./web/themes/custom/milken"),
  AdminTheme: pathUtility.resolve("./web/themes/custom/milken_admin"),
  GinTheme: pathUtility.resolve("./web/themes/contrib/gin"),
  Modules: pathUtility.resolve("./web/modules"),
  Themes: pathUtility.resolve("./web/themes"),
  Core: pathUtility.resolve("./web/core"),
};

export const parsePath = (incoming) => {
  const basename = pathUtility.basename(
    incoming,
    pathUtility.extname(incoming)
  );
  return {
    full: pathUtility.resolve(incoming),
    dirname: pathUtility.dirname(incoming),
    basename,
    relativeDirectory: pathUtility.relative(".", pathUtility.dirname(incoming)),
    libraryName: basename.replace(".entry", ""),
  };
};

export default PathAliases;
