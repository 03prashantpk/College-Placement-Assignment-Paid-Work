#include <iostream>
#include <string>
#include <sstream>

using namespace std;

int findLongCommPreLen(const int* firstArray, int firstArraySize, const int* secondArray, int secondArraySize) {
    int longestCommonPrefixLength = 0;

    for (int i = 0; i < firstArraySize; i++) {
        for (int j = 0; j < secondArraySize; j++) {
            string firstNumStr = to_string(firstArray[i]);
            string secondNumStr = to_string(secondArray[j]);

            int prefixLength = 0;
            int index = 0;

            while (index < firstNumStr.length() && index < secondNumStr.length() && firstNumStr[index] == secondNumStr[index]) {
                prefixLength++;
                index++;
            }

            longestCommonPrefixLength = max(longestCommonPrefixLength, prefixLength);
        }
    }

    return longestCommonPrefixLength;
}

int* parseInput(const string& input, int& size) {
    istringstream iss(input);
    string numStr;

    size = 0;
    while (getline(iss, numStr, ',')) {
        size++;
    }

    int* nums = new int[size];
    iss.clear();
    iss.seekg(0);

    for (int i = 0; i < size; i++) {
        getline(iss, numStr, ',');
        nums[i] = stoi(numStr);
    }

    return nums;
}

int main() {
    string firstArrayInput;
    string secondArrayInput;

    cout << "";
    getline(cin, firstArrayInput);

    cout << "secondArray: ";
    getline(cin, secondArrayInput);

    int firstArraySize = 0;
    int* firstArray = parseInput(firstArrayInput, firstArraySize);

    int secondArraySize = 0;
    int* secondArray = parseInput(secondArrayInput, secondArraySize);

    int longestCommonPrefixLength = findLongCommPreLen(firstArray, firstArraySize, secondArray, secondArraySize);

    cout << "solution(firstArray, secondArray) = " << longestCommonPrefixLength << endl;

    delete[] firstArray;
    delete[] secondArray;

    return 0;
}
