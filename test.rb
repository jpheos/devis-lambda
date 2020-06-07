# frozen_string_literal: true

require 'uri'
require 'net/http'
require 'json'
require 'awesome_print'

body = {
  filename: 'devis13.pdf',
  url: "https://www.bonnefacture.eu/netscribe/static/fr/edit_commercial.html?action=edit&messageType=QUOTE"
}

url = URI("http://localhost:3000/dev/url_to_s3_pdf")
http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true if url.to_s.start_with?('https')
request = Net::HTTP::Post.new(url)
request.body = body.to_json


response = http.request(request)

ap response


ap JSON.parse(response.read_body)

# > File.open("news-yc.pdf","w"){|f| f.write(data)}


