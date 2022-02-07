//
// User "class" objects
//
function user(user_id = -1, user_index = -1)
{
    this.user_id = user_id;
    this.user_index = user_index;
}

//
// Main algorithm -> merge sort
//
function merge(leftArray, rightArray)
{
    let _tempArray = [];
    
    while(leftArray.length && rightArray.length)
    {
        if(leftArray[0].user_id < rightArray[0].user_id)
        {
            _tempArray.push(leftArray.shift());
        }
        else
        {
            _tempArray.push(rightArray.shift());
        }
    }

    return [..._tempArray, ...leftArray, ...rightArray];
}

function mergeSort(array)
{
    const _midpoint = array.length / 2;

    if(array.length < 2)
    {
        return array;
    }

    const _leftArray = array.splice(0, _midpoint);
    return merge(mergeSort(_leftArray), mergeSort(array));
}

//
// Main algorithm -> quick sort for users objects
//
function quickSort(array, startIndex, endIndex)
{
    if(startIndex < endIndex)
    {
        var _newLeft = partition(array, startIndex, endIndex);
        quickSort(array, startIndex, _newLeft - 1);
        quickSort(array, _newLeft + 1, endIndex);
    }
}

function partition(array, leftIndex, rightIndex)
{
    var _pivotValue = array[rightIndex].user_id;
    var _pivotIndex = leftIndex;

    for(i = leftIndex; i < rightIndex; i++)
    {
        if(array[i].user_id < _pivotValue)
        {
            swap(array, i, _pivotIndex);
            _pivotIndex++;
        }
    }
    swap(array, rightIndex, _pivotIndex);
    return _pivotIndex;
}

//
// Main algorithm ->  quick sort for basic integer array
//
function intQuickSort(array, startIndex, endIndex)
{
    if(startIndex < endIndex)
    {
        var _newLeft = partitionBasicInt(array, startIndex, endIndex);
        quickSort(array, startIndex, _newLeft - 1);
        quickSort(array, _newLeft + 1, endIndex);
    }
}

function partitionBasicInt(array, leftIndex, rightIndex)
{
    var _pivotValue = array[rightIndex];
    var _pivotIndex = leftIndex;

    for(i = leftIndex; i < rightIndex; i++)
    {
        if(array[i] < _pivotValue)
        {
            swap(array, i, _pivotIndex);
            _pivotIndex++;
        }
    }
    swap(array, rightIndex, _pivotIndex);
    return _pivotIndex;
}

function swap(array, leftIndex, rightIndex)
{
    var _tempLeftElement = array[leftIndex];
    array[leftIndex] = array[rightIndex];
    array[rightIndex] = _tempLeftElement;
}

//
// Main algorithm -> sort both and traverse linearly
//
function findIntersection(arrayOne, arrayTwo)
{
    var _arrayOneLength = arrayOne.length;
    var _arrayTwoLength = arrayTwo.length;

    var _arrayOneIterator = 0;
    var _arrayTwoIterator = 0;

    let _intersectionArray = [];

    while(_arrayOneIterator < _arrayOneLength && _arrayTwoIterator < _arrayTwoLength)
    {
        if(arrayOne[_arrayOneIterator].user_id < arrayTwo[_arrayTwoIterator])
        {
            _arrayOneIterator++;
        }
        else if(arrayTwo[_arrayTwoIterator] < arrayOne[_arrayOneIterator].user_id)
        {
            _arrayTwoIterator++;
        }
        else
        {
            _intersectionArray.push(arrayTwo[_arrayTwoIterator]);
            _arrayOneIterator++;
            _arrayTwoIterator++;
        }
    }

    return _intersectionArray;
}

//
// Binary search after sorting list
//
function binarySearch(userID, usersArray, startIndex, endIndex)
{
    var _middleIndex = Math.floor((startIndex + endIndex) / 2);
    
    if(startIndex == endIndex && usersArray[_middleIndex].user_id != userID)
    {
        return -1;
    }
    
    if(usersArray[_middleIndex].user_id == userID)
    {
        return _middleIndex;
    }
    else
    {
        if(userID > usersArray[_middleIndex].user_id)
        {
            _newStartIndex = _middleIndex + 1;
            _newEndIndex = endIndex;
            return binarySearch(userID, usersArray, _newStartIndex, _newEndIndex);
        }
        else
        {
            _newStartIndex = 0;
            _newEndIndex = _middleIndex;
            return binarySearch(userID, usersArray, _newStartIndex, _newEndIndex);   
        }
    }
}

//
// Utility functions for testing
//
function createPartnershipsList(partnershipLength, usersArray, usersIDMax)
{
    var _newArray = new Array(partnershipLength);
    var _halfLength = Math.floor(partnershipLength / 2);
    var _toAddID = -1;
    
    function checkExisting()
    {
        return (_newArray.indexOf(_toAddID) > -1);
    }

    function generateRandomID()
    {
        _toAddID = Math.floor(Math.random() * usersIDMax + 1);
    }
    
    for(i = 0; i < partnershipLength; i++)
    {
        if(i < _halfLength)
        {
            _toAddID = usersArray[Math.floor(Math.random() * usersArray.length)].user_id;
            _newArray[i] = _toAddID; 
        }
        else
        {
            while(checkExisting())
            {
                generateRandomID();
            }
            _newArray[i] = _toAddID;
        }
    }

    return _newArray;
}

function createTempUsersList(length, idRangeLower, idRangeUpper)
{
    var _newArray = new Array(length);
    var _length = _newArray.length;
    var _randomID = -1;
    var _userIndex = -1;

    function generateRandom()
    {
        _randomID = Math.floor(Math.random() * (idRangeUpper - idRangeLower + 1)) + idRangeLower;
    }

    function checkExisting()
    {
        var _existingIndex = _newArray.findIndex(user => (user.user_id == _randomID || user.user_index == _userIndex));
        return ( _existingIndex > -1);
    }

    for(i = 0; i < _length; i++)
    {
        _newArray[i] = new user(-99, -99);
    }

    for(var i = 0; i < _length; i++)
    {
        if(i == 0)
        {
            generateRandom();
            _newArray[0] = new user(_randomID, 0);
        }

        while(checkExisting())
        {
            generateRandom();
        }

        _newArray[i] = new user(_randomID, i);        
    }

    return _newArray;
}

function createBasicIntArray(length, idRangeLower, idRangeUpper)
{
    var _newArray = [];
    var _length = length;
    var _randomID = -1;

    function generateRandom()
    {
        _randomID = Math.floor(Math.random() * (idRangeUpper - idRangeLower + 1)) + idRangeLower;
    }

    function checkExisting()
    {
        var _existingIndex = _newArray.indexOf(_randomID);
        return ( _existingIndex > -1);
    }

    for(i = 0; i < _length; i++)
    {
        if(i == 0)
        {
            generateRandom();
            _newArray.push(_randomID);
        }
        else
        {
            while(checkExisting())
            {
                generateRandom();
            }
    
            _newArray.push(_randomID);
        }
    }

    return _newArray;
}

function printPartnershipsArray(printArray)
{
    console.log("Printing partnerships array of length: " + printArray.length + "...");
    console.log("[");
    printArray.forEach(userID => {
        console.log(userID);
    });
    console.log("]");
}

function printUsersArray(printArray, sorted)
{
    console.log("Printing " + sorted ? "SORTED" : "UNSORTED" + " users array of length: " + printArray.length + "...");    
    console.log("[");
    printArray.forEach(user => {
        console.log("( " + user.user_id + " , " + user.user_index + " )");
    });
    console.log("]");
}

function printFoundUsersIndices(printArray)
{
    console.log("Printing user indices for array of length: " + printArray.length + "...");
    console.log("[");
    printArray.forEach(userID => {
        console.log(userID);
    });
    console.log("]");
}

//
// Main function
//
function main()
{
    usersArrayLength = 10000;
    idRangeLower = 0;
    idRangeUpper = 20000;
    indexRangeLower = 0;
    indexRangeHigher = 1000;
    partnershipsLength = 10000;

    var timeStartMerge;
    var timeEndMerge;

    var timeStartNaive;
    var timeEndNaive;

    var timeStartBuiltIn;
    var timeEndBuiltIn;

    var timeStartQuick;
    var timeEndQuick;

    var timeStartDoubleSort;
    var timeEndDoubleSort;

    let foundUserIDIndicesMerge = [];
    let foundUserIDIndicesNaive = [];
    let foundUserIDIndicesBuiltIn = [];
    let foundUserIDIndiciesQuick = [];
    let foundUserIDDoubleQuick = [];

    var usersArray = createTempUsersList(usersArrayLength, idRangeLower, idRangeUpper);
    let usersArrayCopy = [].concat(usersArray);
    let usersArrayQuickCopy = [].concat(usersArray);
    let usersArrayDoubleQuick = [].concat(usersArray);
    //printUsersArray(usersArray, false); 

    let partnershipsArray = createPartnershipsList(partnershipsLength, usersArray, idRangeUpper);
    let partnershipsArrayDoubleQuick = [].concat(partnershipsArray);

    

   // printPartnershipsArray(partnershipsArray);

    //
    // Beginning performance timer for quicksort + binarysearch
    //
    console.log("Beginning the performance timer for double sort... \nUsers length: " + usersArrayLength + "\nPartnerships length: "+ partnershipsLength);
    timeStartDoubleSort = performance.now();

    quickSort(usersArrayDoubleQuick, 0, usersArrayDoubleQuick.length - 1);
    intQuickSort(partnershipsArrayDoubleQuick, 0, partnershipsArrayDoubleQuick.length - 1);
    foundUserIDDoubleQuick = findIntersection(usersArrayDoubleQuick, partnershipsArrayDoubleQuick);

    console.log("Ending the performance timer for double sort...");
    timeEndDoubleSort = performance.now();

    
    //
    // Beginning performance timer for quicksort + binarysearch
    //
    console.log("Beginning the performance timer for quick sort... \nUsers length: " + usersArrayLength + "\nPartnerships length: "+ partnershipsLength);
    timeStartQuick = performance.now();

    quickSort(usersArrayQuickCopy, 0, usersArrayQuickCopy.length - 1);
    partnershipsArray.forEach(userID => {
        var foundIndex = binarySearch(userID, usersArrayQuickCopy, 0, usersArrayQuickCopy.length - 1);
        foundUserIDIndiciesQuick.push(foundIndex);
    });

    console.log("Ending the performance timer for quick sort...");
    timeEndQuick = performance.now();


    //
    // Beginning performance timer naive search
    //
    console.log("Beginning the performance timer for naive search... \nUsers length: " + usersArrayLength + "\nPartnerships length: "+ partnershipsLength);
    timeStartNaive = performance.now();

    partnershipsArray.forEach(userID => {
        var naiveFoundIndex = usersArray.findIndex(user => user.user_id == userID);
        foundUserIDIndicesNaive.push(naiveFoundIndex);
    });

    console.log("Ending the performance timer for naive search...");
    timeEndNaive = performance.now();
    
    //
    // Beginning performance timer merge sort + binary search
    //
    console.log("Beginning the performance timer for sorted and searched list... \nUsers length: " + usersArrayLength + "\nPartnerships length: "+ partnershipsLength);
    timeStartMerge = performance.now();

    let orderedArray = mergeSort(usersArray);
    
    //printUsersArray(orderedArray, true);

    var timeStartBinary = performance.now();
    partnershipsArray.forEach(userID => {
        var foundIndex = binarySearch(userID, orderedArray, 0, orderedArray.length - 1);
        foundUserIDIndicesMerge.push(foundIndex);
    });

    console.log("Ending the performance timer for merged and searched list...");
    timeEndMerge = performance.now();

    //
    // Built in sort
    //
    console.log("Beginning the performance timer for built in... \nUsers length: " + usersArrayCopy.length + "\nPartnerships length: "+ partnershipsLength);
    timeStartBuiltIn = performance.now();

    usersArrayCopy.sort((a,b) => a.user_id - b.user_id);
    partnershipsArray.forEach(userID => {
        var foundIndex = binarySearch(userID, usersArrayCopy, 0, usersArrayCopy.length - 1);
        foundUserIDIndicesBuiltIn.push(foundIndex);
    });

    console.log("Ending the performance timer for built in...");
    timeEndBuiltIn = performance.now();

    //
    // Log final stats
    //
    console.log("Stats...\nExecution time for naive search: "+ (timeEndNaive - timeStartNaive) +" milliseconds\nExecution time for double quick sort: "+ (timeEndDoubleSort - timeStartDoubleSort) +" milliseconds\nExecution time for quick sort: "+ (timeEndQuick - timeStartQuick) +" milliseconds\nExecution time for sorted list: "+ (timeEndMerge - timeStartMerge) +" milliseconds\nExecution time for built in sort: "+ (timeEndBuiltIn - timeStartBuiltIn) +" milliseconds\nUsers length: " + usersArrayLength + "\nPartnerships length: "+ partnershipsLength);


    //printFoundUsersIndices(foundUserIDIndicesNaive);
    //printFoundUsersIndices(foundUserIDIndicesMerge);
}

//
// Run script
//
console.log("Starting execution...");
main();
console.log("...Execution completed");