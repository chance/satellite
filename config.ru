require 'dugway'

options = {}

# Use data from any store to make sure your theme looks great with all sorts of products, pages,
# categories, and more. Just give us the subdomain. Default is "dugway" for dugway.bigcartel.com.
#  options[:store] = 'askalice'
#  options[:store] = 'thisispaper'
#   options[:store] = 'windandwillowhome'
#  options[:store] = 'lunatheme'
#  options[:store] = 'rothirsch'
#  options[:store] = 'woodandmetal'
#  options[:store] = 'pelledesigns'
#	 options[:store] = 'unmarkedmx'
  options[:store] = 'dahlhausart'
#  options[:store] = 'ohmykids'
#  options[:store] = 'herriottgrace'
  
# Simulate the customization done by store owners by passing values to different variables.
# Default values are based on the "default" for each setting in your settings.json.
options[:customization] = {
#   :logo => {
#     :url => 'http://placehold.it/200x50/000000/ffffff&text=My+Logo',
#     :width => 200,
#     :height => 50
#   },
#   :color_background => '#f5f5f5',
#   :color_border => '#CCCCCC',
#   :color_text => '#CCCCCC',
#   :color_text_secondary => '#CCCCCC',
#   :color_link_hover => '#CCCCCC',
#   :show_search => true,
    :show_share_buttons => false,
    :product_list_layout => 'masonry',
    :banner_message => 'Fall Sale! Use code FALLSALE during checkout to get 10% off!',
    :twitter_link  => 'http://twitter.com/bigcartel',
    :facebook_link => 'http://facebook.com/bigcartel',
    :instagram_link => 'http://instagram.com/bigcartel'
}

run Dugway.application(options)
