import AbstractView from './abstract-view';
import GameModel from '../model/game-model';
import {Score, calculateScoredPoints} from "../data/game-data";

export default class RulesView extends AbstractView {
  constructor() {
    super();
    this.model = new GameModel();
  }

  get template() {
    return `
      <div class="result">
        <h1>Победа!</h1>
        <table class="result__table">
          <tr>
            <td colspan="2">
              <ul class="stats">
                ${this.model.getGameProgress()}
                ${this.model.getAmountRemainingLevels().fill(`<li class="stats__result stats__result--unknown"></li>`).join(``)}
               </ul>
            </td>
            <td class="result__points">×&nbsp;
              ${Score.CORRECT_ANSWER}
            </td>
            <td class="result__total">
              ${calculateScoredPoints(this.model.getScore())}
            </td>
          </tr>
          <tr>
            <td class="result__extra">Бонус за жизни:</td>
            <td class="result__extra">
              ${this.model.getCurrentLives()}&nbsp;<span class="stats__result stats__result--alive"></span>
            </td>
            <td class="result__points">
              ×&nbsp;${Score.REMAINING_LIVES}
            </td>
            <td class="result__total">
              ${calculateScoredPoints(undefined, this.model.getCurrentLives())}
            </td>
          </tr>
          <tr>
            <td colspan="5" class="result__total  result__total--final">
              ${calculateScoredPoints(this.model.getScore(), this.model.getCurrentLives())}
            </td>
          </tr>
        </table>
      </div>
    `;
  }
}
