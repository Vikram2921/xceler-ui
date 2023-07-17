import {Profile, Profiles} from "@xceler-ui/xceler-ui";
import simple_grid from "./SimpleGrid/simple_grid.json";

export class ProfileRegister {

  private static profileMap: Map<Profiles, Profile> = new Map<Profiles, Profile>();
  static registerAllProfiles() {
    this.profileMap.set(Profiles.SIMPLE_GRID,Object.assign(new Profile(),simple_grid))
  }

  static getProfile(profile: Profiles): Profile {
    return this.profileMap.get(profile)??new Profile();
  }
}
