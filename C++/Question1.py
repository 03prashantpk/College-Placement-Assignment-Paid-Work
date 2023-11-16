def solution(years):
    total_time = 0
    n = len(years)

    for i in range(1, n):
        if years[i] == years[i - 1]:
            total_time += 0
        elif years[i] > years[i - 1]:
            total_time += 1
        else:
            total_time += 2

    return total_time


if __name__ == '__main__':
    years = input("Enter the years separated by commas: ").split(',')
    years = [int(year) for year in years]

    result = solution(years)
    print("solution(years) =", result)
