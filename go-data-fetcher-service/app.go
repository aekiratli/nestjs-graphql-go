package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
)

type Cat struct {
	Id    int    `json:"id"`
	Name  string `json:"name"`
	Age   int    `json:"age"`
	Breed string `json:"breed"`
}

func logRequest(handler http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		log.Printf("Received %s request for %s from %s", req.Method, req.URL.Path, req.RemoteAddr)
		handler(w, req)
	}
}

func getCats(w http.ResponseWriter, req *http.Request) {
	graphqlUrl := os.Getenv("GRAPHQL_SERVER_URL")
	if graphqlUrl == "" {
		graphqlUrl = "http://localhost:3000/graphql"
	}
	body := []byte(`{
		"query": "{ cats { id name age breed } }"
	}`)
	resp, err := http.Post(graphqlUrl, "application/json", bytes.NewBuffer(body))
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()

	var result struct {
		Data struct {
			Cats []Cat
		}
	}
	json.NewDecoder(resp.Body).Decode(&result)

	// Convert the result to JSON and write it to the response
	err = json.NewEncoder(w).Encode(result.Data.Cats)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func notFound(w http.ResponseWriter, req *http.Request) {
	w.WriteHeader(http.StatusNotFound)
	fmt.Fprintf(w, "404 - Not Found: %s", req.URL.Path)
	log.Printf("404 - Not Found: %s", req.URL.Path)
}

func main() {
	// Wrap handlers with logRequest middleware
	http.HandleFunc("/get_cats", logRequest(getCats))

	// Handle 404 errors
	http.HandleFunc("/", notFound)

	// Start server on port 8090
	log.Println("Starting server on http://localhost:8090")
	log.Fatal(http.ListenAndServe(":8090", nil))
}
