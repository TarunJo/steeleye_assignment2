/**
 * Strips the prefix from the keys of the given key-value pairs
 * @param {string} htmlContent - HTML content which needs to be highlighted 
 * @param {string} plainText - This plain text is extracted from htmlContent
 * @param {array} plainTextPositions - Array of Objects with start and end positions of words in plainText (Not the positions in HTML)
 * @returns {string} Using the positions in plainText, find the appropriate positions in htmlContent, highlight the content and return it
 */


// First approach

// function highlightHTMLContent(htmlContent, plainText, plainTextPositions) {
//   // your logic goes here
//   var count = 0;
//   const pairs = {};

//   // Making key value pair of index and tag type 1 for opening 2 for closing 
//   for (var i = 0; i < plainTextPositions.length; i++) {
//     pairs[plainTextPositions[i].start] = 1;
//     pairs[plainTextPositions[i].end] = -1;
//   }

//   // Itrating through the complete plainText and updating htmlContent as per requirement
//   for (var i = 0, j = 0; i < plainText.length && j < htmlContent.length; i++, j++) {
//     if (pairs[i] === 1) {
//       // deleting pair to remove duplicates and prevent runtime errors
//       delete pairs[i];

//       htmlContent = htmlContent.slice(0, j) + "<mark>" + htmlContent.slice(j);
//     }
//     else if (pairs[i] === -1) {
//       // deleting pair to remove duplicates and prevent runtime errors
//       delete pairs[i];

//       htmlContent = htmlContent.slice(0, j) + "</mark>" + htmlContent.slice(j);
//     }

//     // Skipping tags present in the htmlContent
//     if (htmlContent[j] === "<") count = 1;
//     else if (htmlContent[j] === ">") count = 2;
//     else if (count === 2) {
//       if (plainText[i] === " ") {
//         i++;
//         count = 0;
//       }
//       else
//         count = 0;
//     }
//     if (count !== 0) i--;
//   }

//   return htmlContent;
// }




// Second approach

function highlightHTMLContent(htmlContent, plainText, plainTextPositions) {
  // your logic goes here
  for (var i = 0; i < plainTextPositions.length; i++) {
    var check = 0;
    var k = 0;
    for (var j = 0; j < plainTextPositions[i].start; j++, k++) {
      if (htmlContent[k] === "<") {
        check = 1;
      }
      else if (htmlContent[k] == ">") {
        check = 2;
      }
      else if (check === 2) {
        if (plainText[j] === " ") {
          k--;
          check = 0;
        }
        else
          check = 0;
      }
      if (check !== 0) j--;
    }

    if(htmlContent[k] === " ") k++;
    var l = k;
    check = 0;
    for (var j = k; j < k + (plainTextPositions[i].end - plainTextPositions[i].start); j++, l++) {
      if (htmlContent[l] === "<") {
        check = 1;
      }
      else if (htmlContent[l] == ">") {
        check = 2;
      }
      else if (check === 2) {
        if (plainText[j] === " ") {
          l--;
          check = 0;
        }
        else
          check = 0;
      }
      if (check !== 0) j--;
    }
    var middle = htmlContent.slice(k, l);
    
    var leftcount = 0, rightcount = 0;
    var storage = [];
    var temp = "";
    for (var j = k; j <= l; j++) {
      if (temp === "" && htmlContent[j] !== "<") {
        break;
      }
      else if (htmlContent[j] !== ">") {
        temp += htmlContent[j];
      }
      else {
        temp += ">";
        storage.push(temp);
        temp = "";
      }
    }
    temp = "";
    var total = storage.length;
    for (var j = l; j < htmlContent.length; j++) {
      if (temp === "" && htmlContent[j] !== "<") {
        break;
      }
      if (temp === "" && htmlContent[j] !== "<") {
        break;
      }
      else if (htmlContent[j] !== ">") {
        if (temp !== "/")
          temp += htmlContent[j];
      }
      else {
        temp += ">";
        if (temp === storage[storage.length - 1]) {
          leftcount++;
          rightcount++;
          storage.pop();
        }
        else {
          rightcount++;
        }
        temp = "";
      }
    }
    total-=leftcount;
    for(var j=0; j<middle.length; j++) {
      if(total===0) {
        middle=middle.slice(0, j)+"<mark>"+middle.slice(j);
        break;
      }
      if(middle[j]===">") {
        total--;
      }
    }
    var rightportion= htmlContent.slice(l);
    for(var j=0; j<rightportion.length; j++)
    {
      if(rightcount===0) {
        rightportion= rightportion.slice(0, j)+"</mark>"+rightportion.slice(j);
        break;
      }
      if(rightportion[j]===">") {
        rightcount--;
      }
    }
    htmlContent = htmlContent.slice(0, k) + middle + rightportion;
  }
  return htmlContent;
}

module.exports = highlightHTMLContent;