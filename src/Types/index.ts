export enum APP_IDS {
  POSTEN = "posten",
  KLARNA = "klarna",
  VISMA = "visma",
}

export interface UserData {
  privileges: Partial<Record<APP_IDS, boolean>>;
}

export interface AppButtonConfig {
  icon: string;
  buttonText: string;
}
