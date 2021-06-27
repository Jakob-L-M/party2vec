import sys
import numpy as np

def main(input_text):
    return [np.random.random() for _ in range(6)]
 
if __name__ == "__main__":
    # sys.argv[1] = Text in textfield
    x=main(sys.argv[1])
    print(x)