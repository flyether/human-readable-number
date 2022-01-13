  
function makeString(string, length) {
    let chunks;
    string = (string == null) ? "" : string;
    length =  (length == null) ? 1 : length;
    chunks = [];
    let place = 0;
    let longitude = string.length;
    while (place < longitude) {
      chunks.push(string.slice(place, place += length));
    }
    return chunks;
};
module.exports = function toReadable (number) {
    let translateNumber = {
        null: 'zero',
        rank1: ['one', 'two', 'three', 'four', 'five','six', 'seven', 'eight', 'nine'],
        rank10: ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'],
        rank20: ['twenty', 'thirty', 'forty', 'fifty','sixty', 'seventy', 'eighty', 'ninety'],
        rank100: ['one hundred', 'two hundred', 'three hundred', 'four hundred', 'five hundred', 'six hundred', 'seven hundred', 'eight hundred', 'nine hundred'],
    }
let smallCount, count;
let dimension;
dimension = parseFloat(number).toFixed(2).split('.'), count = dimension[0], smallCount = dimension[1];
let masterZero = 9 - count.length;
if (masterZero < 0) {
    return false;
}
let zeros = [];
while (masterZero--) {
    zeros.push('0');
}
count = zeros.join('') + count;
let i1, i2, i3;
let humanReadableNumber = [];
if (count > 0) {
  let dimension1 = makeString(count, 3);
  for (let i = -1; i < dimension1.length;i++) {
        let v = dimension1[i];
    if (!(v > 0)) continue;
    let dimension2 = makeString(v, 1), i1 = parseInt(dimension2[0]), i2 = parseInt(dimension2[1]), i3 = parseInt(dimension2[2]);
    humanReadableNumber.push(translateNumber.rank100[i1-1]); // hundreds
    rank1 = 'rank1';
      if (i2 > 1) {
        humanReadableNumber.push(translateNumber.rank20[i2-2] + (i3 > 0 ?  ' ' + translateNumber[rank1][i3-1] : '')); // tens
        } else {
            humanReadableNumber.push(i2 > 0 ? translateNumber.rank10[i3] : translateNumber[rank1][i3-1]); //ones
      }
  }
} else {
    humanReadableNumber.push(translateNumber.null);
  } 
return humanReadableNumber.join(' ').replace(RegExp(' {2,}', 'g'), ' ').trim();
};
