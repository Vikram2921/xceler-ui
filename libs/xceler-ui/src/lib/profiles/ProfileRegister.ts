import {Profile, Profiles} from "@xceler-ui/xceler-ui";
import simple_grid from "./SimpleGrid/simple_grid.json";
import tab_grid from "./grid_with_tabs/tab_grid.json";
import match_grid from "./match_ui/match.json";

export class ProfileRegister {

  private static profileMap: Map<Profiles, Profile> = new Map<Profiles, Profile>();
  static registerAllProfiles() {
    this.profileMap.set(Profiles.SIMPLE_GRID,Object.assign(new Profile(),simple_grid))
    this.profileMap.set(Profiles.TAB_GRID,Object.assign(new Profile(),tab_grid))
    this.profileMap.set(Profiles.MATCHING_GRID,Object.assign(new Profile(),match_grid))
  }

  static getProfile(profile: Profiles): Profile {
    return this.profileMap.get(profile)??new Profile();
  }
}
