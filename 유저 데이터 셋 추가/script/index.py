import glob
import os

BAR_SIZE = 32

def get_problem_path():
    problem = input('문제 번호:\n>>> ')
    problem_path = glob.glob(os.path.join('problem', f'{problem}*'))[0]
    print()
    print('[INFO] 선택된 폴더:', problem_path)
    return problem_path

if __name__ == '__main__':
    problem_path = get_problem_path()

    username = input('\nBOJ 유저네임:\n>>> ')
    datasets = int(input('\n생성할 데이터 셋 개수:\n>>> '))

    data_path = os.path.join(problem_path, 'data', 'boj', username)
    if not os.path.exists(data_path):
        os.makedirs(data_path)
    if not os.path.isdir(data_path):
        raise FileExistsError()

    file_no = 0
    created = 0
    while (created < datasets):
        file_no += 1

        input_file = os.path.join(data_path, f'{file_no}.in')
        output_file = os.path.join(data_path, f'{file_no}.out')
        
        if os.path.exists(input_file) or os.path.exists(output_file):
            continue

        with open(input_file, 'w'): pass
        with open(output_file, 'w'): pass

        created += 1
