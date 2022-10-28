import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Game2048';
  gridMatrix: any[4][4] = [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']]
  sourceNo: any[] = [2, 4, 8, 16, 32, 64, 128];
  score = 0;
  gameOver = false;
  ngOnInit() {
    this.initialLoad();
  }

  initialLoad() {
    let startRow1 = Math.floor(Math.random() * 4);
    let startColumn1 = Math.floor(Math.random() * 4);
    let startRow2 = Math.floor(Math.random() * 4);
    let startColumn2 = Math.floor(Math.random() * 4);
    this.gridMatrix[startRow1][startColumn1] = this.sourceNo[Math.floor(Math.random() * 6)];
    this.gridMatrix[startRow2][startColumn2] = this.sourceNo[Math.floor(Math.random() * 6)];
  }

  arrowMove(event: any) {
    if (!this.gameOver) {
      let temp: any[4][4] = [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']];
      let Flag = false;
      if (event.key == "ArrowLeft") {
        Flag = true;
        for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
          for (let columnIndex = 0; columnIndex < 4; columnIndex++) {
            for (let columnIndex2 = 0; columnIndex2 <= columnIndex; columnIndex2++) {
              if (this.gridMatrix[rowIndex][columnIndex] && (!temp[rowIndex][columnIndex2]
                || this.gridMatrix[rowIndex][columnIndex] == temp[rowIndex][columnIndex2])) {
                if (this.gridMatrix[rowIndex][columnIndex] == temp[rowIndex][columnIndex2]
                  && columnIndex != columnIndex2) {
                  temp[rowIndex][columnIndex2] += this.gridMatrix[rowIndex][columnIndex];
                  this.score += this.gridMatrix[rowIndex][columnIndex] + this.gridMatrix[rowIndex][columnIndex];
                } else {
                  temp[rowIndex][columnIndex2] = this.gridMatrix[rowIndex][columnIndex];
                }
                break;
              }
            }
          }
        }
      } else if (event.key == "ArrowRight") {
        Flag = true;
        for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
          for (let columnIndex = 3; columnIndex >= 0; columnIndex--) {
            for (let columnIndex2 = 3; columnIndex2 >= columnIndex; columnIndex2--) {
              if (this.gridMatrix[rowIndex][columnIndex] && (!temp[rowIndex][columnIndex2]
                || this.gridMatrix[rowIndex][columnIndex] == temp[rowIndex][columnIndex2])) {
                if (this.gridMatrix[rowIndex][columnIndex] == temp[rowIndex][columnIndex2]
                  && columnIndex != columnIndex2) {
                  temp[rowIndex][columnIndex2] += this.gridMatrix[rowIndex][columnIndex];
                  this.score += this.gridMatrix[rowIndex][columnIndex] + this.gridMatrix[rowIndex][columnIndex];
                } else {
                  temp[rowIndex][columnIndex2] = this.gridMatrix[rowIndex][columnIndex];
                }
                break;
              }
            }
          }
        }
      }
      else if (event.key == "ArrowUp") {
        Flag = true;
        for (let columnIndex = 0; columnIndex < 4; columnIndex++) {
          for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
            for (let rowIndex2 = 0; rowIndex2 <= rowIndex; rowIndex2++) {
              if (this.gridMatrix[rowIndex][columnIndex] && (!temp[rowIndex2][columnIndex]
                || this.gridMatrix[rowIndex][columnIndex] == temp[rowIndex2][columnIndex])) {
                if (this.gridMatrix[rowIndex][columnIndex] == temp[rowIndex2][columnIndex] &&
                  rowIndex2 != rowIndex) {
                  temp[rowIndex2][columnIndex] += this.gridMatrix[rowIndex][columnIndex];
                  this.score += this.gridMatrix[rowIndex][columnIndex] + this.gridMatrix[rowIndex][columnIndex];
                } else {
                  temp[rowIndex2][columnIndex] = this.gridMatrix[rowIndex][columnIndex];
                }
                break;
              }
            }
          }
        }
      }
      else if (event.key == "ArrowDown") {
        Flag = true;
        for (let columnIndex = 0; columnIndex < 4; columnIndex++) {
          for (let rowIndex = 3; rowIndex >= 0; rowIndex--) {
            for (let rowIndex2 = 3; rowIndex2 >= rowIndex; rowIndex2--) {
              if (this.gridMatrix[rowIndex][columnIndex] && (!temp[rowIndex2][columnIndex]
                || this.gridMatrix[rowIndex][columnIndex] == temp[rowIndex2][columnIndex])) {
                if (this.gridMatrix[rowIndex][columnIndex] == temp[rowIndex2][columnIndex]
                  && rowIndex != rowIndex2) {
                  temp[rowIndex2][columnIndex] += this.gridMatrix[rowIndex][columnIndex];
                  this.score += this.gridMatrix[rowIndex][columnIndex] + this.gridMatrix[rowIndex][columnIndex];
                } else {
                  temp[rowIndex2][columnIndex] = this.gridMatrix[rowIndex][columnIndex];
                }
                break;
              }
            }
          }
        }
      }
      if (Flag) {
        this.gridMatrix = this.newEntryCreation(temp);
      }
    }
  }

  betweenCellChecker(type: string, current: number, matching: number,
    common: number, temp: any[4][4]) {
    if (type == "up") {
      for (let rowIndex = current; rowIndex < matching; rowIndex--) {
        if (temp[rowIndex][common])
          return false;
      }
    }
    else if (type == "down") {
      for (let rowIndex = current; rowIndex > matching; rowIndex++) {
        if (temp[rowIndex][common])
          return false;
      }
    }
    else if (type == "right") {
      for (let columnIndex = current; columnIndex < matching; columnIndex--) {
        if (temp[common][columnIndex])
          return false;
      }
    }
    else if (type == "left") {
      for (let columnIndex = current; columnIndex > matching; columnIndex++) {
        if (temp[common][columnIndex])
          return false;
      }
    }
    return true;
  }

  newEntryCreation(temp: any[][]) {
    let tempEmptyArrR: number[] = [];
    let tempEmptyArrC: number[] = [];
    for (let rowIndex = 0; rowIndex < temp.length; rowIndex++) {
      for (let columnIndex = 0; columnIndex < temp.length; columnIndex++) {
        if (!temp[rowIndex][columnIndex]) {
          tempEmptyArrR.push(rowIndex);
          tempEmptyArrC.push(columnIndex);
        }
      }
    }
    if (tempEmptyArrR.length > 0) {
      let tempNo = Math.floor(Math.random() * tempEmptyArrR.length);
      temp[tempEmptyArrR[tempNo]][tempEmptyArrC[tempNo]] = this.sourceNo[Math.floor(Math.random() * 6)];
    } else {
      let Flag = false;
      for (let rowIndex = 0; rowIndex < temp.length - 1; rowIndex++) {
        for (let columnIndex = 0; columnIndex < temp.length - 1; columnIndex++) {
          if (temp[rowIndex][columnIndex] == temp[rowIndex][columnIndex + 1] || temp[rowIndex][columnIndex] == temp[rowIndex + 1][columnIndex]) {
            Flag = true;
          }
        }
      }
      if (!Flag) {
        this.gameOver = true;
      }
    }
    return temp;
  }

  bindColor(index: number) {
    switch (index) {
      case 2:
        return "#F8C5C5";
      case 4:
        return "#CCE697";
      case 8:
        return "#FFD588";
      case 16:
        return "#A4C9C9";
      case 32:
        return "#FFFFCC";
      case 64:
        return "#E4AEFF";
      case 128:
        return "#E4AEFF";
      case 256:
        return "lightred";
      default:
        return "#FFFFCC";
    }
  }
}
