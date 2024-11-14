import * as stdYAML from "@std/yaml";
import * as stdTOML from "@std/toml";
import * as stdINI from "@std/ini";

export const serializers = {
    YAML: {
        parse: stdYAML.parse,
        stringify: stdYAML.stringify,
    },
    TOML: {
        parse: stdTOML.parse,
        stringify: stdTOML.stringify,
    },
    JSON: {
        parse: JSON.parse,
        stringify: JSON.stringify,
    },
    INI: {
        parse: stdINI.parse,
        stringify: stdINI.stringify,
    },
};
