import { PlayerStatus } from "shared/enums/GameEnums";

export interface PlayerData {
    player: Player;
    status: PlayerStatus;
    target?: Player;
    hunter?: Player;
    money: number;
    needs: PlayerNeeds;
    inventory: Item[];
}

export interface Item {
    name: string;
    description: string;
}

export interface PlayerNeeds {
    sleep: number;      // 0-100
    food: number;       // 0-100
    fun: number;        // 0-100
    bathroom: number;   // 0-100
}
