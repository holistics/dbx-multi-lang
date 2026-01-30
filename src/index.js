import * as yaml from 'js-yaml';
import enCommonYaml from '../locales/en/common.yaml?raw';
import enAuthYaml from '../locales/en/auth.yaml?raw';
import enBillingYaml from '../locales/en/billing.yaml?raw';
import enDiagramYaml from '../locales/en/diagram.yaml?raw';
import enDbrendererYaml from '../locales/en/dbrenderer.yaml?raw';
import enHeaderYaml from '../locales/en/header.yaml?raw';
import enHomeYaml from '../locales/en/home.yaml?raw';
import enModalsYaml from '../locales/en/modals.yaml?raw';
import enWorkspaceYaml from '../locales/en/workspace.yaml?raw';
import enAiYaml from '../locales/en/ai.yaml?raw';

import viCommonYaml from '../locales/vi/common.yaml?raw';
import viAuthYaml from '../locales/vi/auth.yaml?raw';
import viBillingYaml from '../locales/vi/billing.yaml?raw';
import viDiagramYaml from '../locales/vi/diagram.yaml?raw';
import viDbrendererYaml from '../locales/vi/dbrenderer.yaml?raw';
import viHeaderYaml from '../locales/vi/header.yaml?raw';
import viHomeYaml from '../locales/vi/home.yaml?raw';
import viModalsYaml from '../locales/vi/modals.yaml?raw';
import viWorkspaceYaml from '../locales/vi/workspace.yaml?raw';
import viAiYaml from '../locales/vi/ai.yaml?raw';

// Locale configuration
export const SUPPORT_LOCALES = ['en', 'vi'];
export const DEFAULT_LOCALE = 'en';
export const LOCALE_STORAGE_KEY = 'dbdiagram-locale';

// Parse YAML strings to objects
function parseYaml(yamlString) {
  return yaml.load(yamlString);
}

// Build messages with namespaces
// Each YAML file becomes its own namespace (e.g., header.yaml → header)
export const messages = {
  en: {
    common: parseYaml(enCommonYaml),
    auth: parseYaml(enAuthYaml),
    billing: parseYaml(enBillingYaml),
    diagram: parseYaml(enDiagramYaml),
    dbrenderer: parseYaml(enDbrendererYaml),
    header: parseYaml(enHeaderYaml),
    home: parseYaml(enHomeYaml),
    modals: parseYaml(enModalsYaml),
    ai: parseYaml(enAiYaml),
    // workspace.yaml keeps its nested structure as a single namespace
    workspace: parseYaml(enWorkspaceYaml),
  },
  vi: {
    common: parseYaml(viCommonYaml),
    auth: parseYaml(viAuthYaml),
    billing: parseYaml(viBillingYaml),
    diagram: parseYaml(viDiagramYaml),
    dbrenderer: parseYaml(viDbrendererYaml),
    header: parseYaml(viHeaderYaml),
    home: parseYaml(viHomeYaml),
    modals: parseYaml(viModalsYaml),
    ai: parseYaml(viAiYaml),
    // workspace.yaml keeps its nested structure as a single namespace
    workspace: parseYaml(viWorkspaceYaml),
  },
};
