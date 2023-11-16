def findLongCommPreLen(first_array, second_array):
    longest_common_prefix_length = 0

    for first_num in first_array:
        for second_num in second_array:
            first_num_str = str(first_num)
            second_num_str = str(second_num)

            prefix_length = 0
            index = 0

            while (index < len(first_num_str) and index < len(second_num_str) and first_num_str[index] == second_num_str[index]):
                prefix_length += 1
                index += 1

            longest_common_prefix_length = max(longest_common_prefix_length, prefix_length)

    return longest_common_prefix_length

def parse_input(input_string):
    nums = input_string.strip().split(", ")
    return [int(num) for num in nums]

def main():
    first_array_input = input("firstArray: ")
    second_array_input = input("secondArray: ")

    first_array = parse_input(first_array_input)
    second_array = parse_input(second_array_input)

    longest_common_prefix_length = findLongCommPreLen(first_array, second_array)

    print(f"solution(firstArray, secondArray) = {longest_common_prefix_length}")

if __name__ == "__main__":
    main()
