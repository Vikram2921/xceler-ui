import {Profile, Profiles} from "@xceler-ui/xceler-ui";
import simple_grid from "./simple_grid.json";
import grid_only from "./grid_only.json";
import tab_grid from "./tab_grid.json";
import match_grid from "./match.json";

export class ProfileRegister {

  private static profileMap: Map<Profiles, Profile> = new Map<Profiles, Profile>();
  static registerAllProfiles() {
    this.profileMap.set(Profiles.SIMPLE_GRID,Object.assign(new Profile(),simple_grid))
    this.profileMap.set(Profiles.GRID_ONLY,Object.assign(new Profile(),grid_only))
    this.profileMap.set(Profiles.TAB_GRID,Object.assign(new Profile(),tab_grid))
    this.profileMap.set(Profiles.MATCHING_GRID,Object.assign(new Profile(),match_grid))
  }

  static getProfile(profile: Profiles): Profile {
    return this.profileMap.get(profile)??new Profile();
  }
}
