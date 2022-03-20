(ns solution10-2
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
      true (conj acc y))))

(defn check [s]
  (reduce parensReducer [] s))

(def points-for
  { \( 1
    \[ 2
    \{ 3
    \< 4})

(defn score [line]
  (->> line
     reverse
     (map points-for)
     (reduce (fn [acc x] (+ (* acc 5) x)) 0)))

(defn middle [v]
  (v (int (/ (count v) 2))))

(defn -main []
  (->>
    (slurp "input10.txt")
    lines
    (map check)
    (filter vector?) ; Keep only pending
    (map score)
    (sort)
    (vec)
    (middle)
    println))

(-main)
