(ns solution10-1
    (:require [clojure.string :as str]))

(defn lines [s] (str/split s #"\n"))

(defn match? [x y]
  (or
    (and (= x \() (= y \)))
    (and (= x \[) (= y \]))
    (and (= x \{) (= y \}))
    (and (= x \<) (= y \>))))

(def closing? #{\) \] \} \>})

(defn parensReducer [acc y]
  (let [x (peek acc)]
    (cond
      (match? x y) (pop acc)
      (closing? y) (reduced y)
      :else (conj acc y))))

(defn check [s]
  (reduce parensReducer [] s))

(def points {\) 3, \] 57, \} 1197, \> 25137})

(defn -main []
  (->>
    (slurp "input10.txt")
    lines
    (map check)
    (filter char?) ; Keep only corrupt
    (map points)
    (reduce +)
    println))

(-main)
