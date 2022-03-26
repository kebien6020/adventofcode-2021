(ns solution13-1
  (:require [clojure.string :as str])
  (:require [clojure.edn :as edn]))

(defn parse-fold [s]
  (-> s
    (str/split #" ")
    last
    (str/split #"=")
    ((fn [[a b]]
       {:axis (if (= "x" a) :x :y)
        :val  (edn/read-string b)}))))

(defn parse-coord [s]
  (-> s
    (str/split #",")
    (->> (mapv edn/read-string))))

(defn parse-input [s]
  (let [
        [coords foldLines] (map str/split-lines (str/split s #"\n\n"))
        dots (set (map parse-coord coords))
        folds (mapv parse-fold foldLines)]
    {:dots dots :folds folds}))

(defn fold-dot [[x y] {axis :axis val :val}]
  (cond
    (and (= :x axis) (> x val)) [(- (* 2 val) x) y]
    (and (= :y axis) (> y val)) [x (- (* 2 val) y)]
    :else [x y]))

(defn apply-fold [dots fold]
  (->> dots
    (map #(fold-dot % fold))
    (set)))

(defn set-dot [mat [x y]]
  (assoc mat y (assoc (mat y) x \#)))

(defn draw-dots [dots]
  (let [x (inc (reduce #(max %1 (first %2)) 0 dots))
        y (inc (reduce #(max %1 (second %2)) 0 dots))
        mat (vec (repeat y (vec (repeat x \.))))]
    (reduce set-dot mat dots)))

(defn -main []
  (->>
    (slurp "input13.txt")
    (parse-input)
    (#(reduce apply-fold (:dots %) (:folds %)))
    draw-dots
    (map #(str/join " " %))
    (str/join "\n")
    println))

(-main)
