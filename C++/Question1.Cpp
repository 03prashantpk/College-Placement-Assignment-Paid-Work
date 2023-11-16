#include <iostream>
#include <vector>
#include <sstream>
using namespace std;

int solution(vector<int>& years) {
    int totalTime = 0;
    int n = years.size();

    for (int i = 1; i < n; i++) {
        if (years[i] == years[i - 1]) {
            totalTime += 0;
        }
        else if (years[i] > years[i - 1]) {
            totalTime += 1;
        }
        else {
            totalTime += 2;
        }
    }

    return totalTime;
}

int main() {
    string input;
    cout << "Enter the years separated by commas: ";
    getline(cin, input);

    vector<int> years;
    stringstream ss(input);
    string year;

    while (getline(ss, year, ',')) {
        years.push_back(stoi(year));
    }

    int result = solution(years);
    cout << "solution(years) = " << result << endl;

    return 0;
}
