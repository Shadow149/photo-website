import cv2 as cv
import numpy as np
# from matplotlib import pyplot as plt

img = cv.imread('E:\\Edited Photos\\U75A7906.jpg')

scale_percent = 10 # percent of original size
width = int(img.shape[1] * scale_percent / 100)
height = int(img.shape[0] * scale_percent / 100)
dim = (width, height)
print(dim)
img = cv.resize(img, dim, interpolation= cv.INTER_AREA)

blur = cv.GaussianBlur(img,(25,25),0)

rgb = np.flip(np.average(blur, axis = (0,1)))

hex_value = '#'

for c in rgb:
    hex_value += hex(int(c))[2:]
    
print(hex_value)
# cv.imshow('img',blur)
# cv.waitKey(0)