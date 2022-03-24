(ns solution11-1
  (:require
    [clojure.string :as str]
    [clojure.edn :as edn]))


(defn to-digits [s]
  (->> s
    (apply list)
    (map str)
    (map edn/read-string)))

(defn parse-input [data]
  (-> data
    (str/split #"\n")
    (->> (map to-digits))))

(defn set-2d [d i j x]
  (assoc d i (assoc (d i) j x)))

(defn get-2d [d i j]
  ((d i) j))

(defn flash-on [d i j]
  (set-2d d i j 0)
  (set-2d d (inc i) j (inc (get-2d d (inc i) j))))

(defn handle-flashes [d]
  (reduce
    (fn [acc-o [i row]]
      (reduce
        (fn [acc [j x]]
          (if (< x 9) acc (flash-on acc i j)))
       acc-o (map-indexed list row)))
   d (map-indexed list d)))


(defn step [d]
  (->> d
    (mapv #(mapv inc %))
    handle-flashes))

(defn trace [x] (println x) x)

(defn -main []
  (->>
    (slurp "input11-test.txt")
    parse-input
    trace
    step
    println))


; (-main)

(println (handle-flashes [[9 8] [4 9]]))
