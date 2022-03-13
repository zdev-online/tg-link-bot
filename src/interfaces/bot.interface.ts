import { Context, Scenes } from "telegraf";

interface WizardSession extends Scenes.WizardSessionData {
  [key: string]: any;
  state: {
    [key: string]: string;
  }
}

interface Session extends Scenes.WizardSession<WizardSession> { 
  [key: string]: any;
}

export interface BotContext extends Context {
  session: Session;
  scene: Scenes.SceneContextScene<BotContext, WizardSession>;
  wizard: Scenes.WizardContextWizard<BotContext>;
}
