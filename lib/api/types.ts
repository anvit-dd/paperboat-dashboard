/**
 * TypeScript mirrors of paperboat-server JSON payloads. Field names match the
 * server's snake_case contract (internal/auth, internal/billing, internal/github,
 * internal/projects). Keep in lockstep with the frozen HTTP contract.
 */

export interface Me {
  id: string;
  email: string;
  display_name: string;
  status: string;
  role: string;
  workos_subject: string;
}

export interface Entitlement {
  state: string;
  plan_code?: string;
  plan_name?: string;
  current_period_start?: string;
  current_period_end?: string;
  active: boolean;
}

export interface Usage {
  credits_balance: string;
  included_storage_gb: number;
  purchased_storage_gb: number;
  allocated_storage_gb: number;
  available_storage_gb: number;
}

export interface BillingPlanProduct {
  code: string;
  plan_code: string;
  plan_name: string;
  included_credits: string;
  included_storage_gb: number;
}

export interface GitHubStatus {
  connected: boolean;
  scopes: string[];
  missing_scopes: string[];
  last_validated_at?: string;
  config_repo_provisioned: boolean;
  config_repo_owner?: string;
  config_repo_name?: string;
  config_repo_branch?: string;
}

export interface GitHubRepository {
  owner: string;
  name: string;
  full_name: string;
  default_branch: string;
  clone_url: string;
  html_url: string;
  private: boolean;
}

/** Project lifecycle states, from the HTTP contract "Project State Enums". */
export type ProjectState =
  | "creating"
  | "provisioning_storage"
  | "provisioning_machine"
  | "ready"
  | "starting"
  | "running"
  | "stopping"
  | "stopped"
  | "restarting"
  | "deleting"
  | "deleted"
  | "failed"
  | "suspended";

export interface ProjectRepo {
  provider: string;
  source_url: string;
  default_branch: string;
}

export interface ProjectConfig {
  storage_gb: number;
  machine_type_code: string;
  region_code: string;
  preset_codes: string[];
  idle_timeout_code: string;
  setup_script_ref?: string;
  config_hash: string;
}

export interface Project {
  id: string;
  name: string;
  state: ProjectState;
  repository: ProjectRepo;
  current_config: ProjectConfig;
  desired_config: ProjectConfig;
  pending_restart_apply: boolean;
  restart_required: boolean;
  setup_script_revisions: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectListResponse {
  items: Project[];
  pagination: {
    limit: number;
    offset: number;
    total: number;
    next_offset: number | null;
  };
  filters: {
    state: string;
  };
  sort: string;
}

export interface ProjectEvent {
  id: string;
  type: string;
  message: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface CheckoutSession {
  url: string;
}

export interface CatalogPlan {
  code: string;
  name: string;
  active: boolean;
  included_credits: string;
  included_storage_gb: number;
  version: number;
}

export interface CatalogMachineType {
  code: string;
  name: string;
  vcpu: number;
  memory_mb: number;
  credit_weight: string;
  custom_shape_allowed: boolean;
  active: boolean;
  version: number;
}

export interface CatalogPreset {
  code: string;
  name: string;
  description: string;
  active: boolean;
  version: number;
}

export interface CatalogIdleTimeout {
  code: string;
  duration_seconds: number;
  active: boolean;
  version: number;
}

export interface CatalogRegion {
  code: string;
  name: string;
  enabled: boolean;
  version: number;
}
