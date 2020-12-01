<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* themes/custom/pendeedus/templates/page--user--login.html.twig */
class __TwigTemplate_9a9aff5ae03d6c60efa6d86c58e891763f981c6193bef39cac3fc49036bdd965 extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
            'featured' => [$this, 'block_featured'],
            'content' => [$this, 'block_content'],
            'footer' => [$this, 'block_footer'],
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $tags = ["include" => 72, "if" => 73, "block" => 81];
        $filters = ["escape" => 75];
        $functions = [];

        try {
            $this->sandbox->checkSecurity(
                ['include', 'if', 'block'],
                ['escape'],
                []
            );
        } catch (SecurityError $e) {
            $e->setSourceContext($this->getSourceContext());

            if ($e instanceof SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        // line 70
        echo "<div id=\"page-wrapper\">
  <div id=\"page\" class=\"d-flex flex-column\">
    ";
        // line 72
        $this->loadTemplate("@pendeedus/includes/header--anonymous.html.twig", "themes/custom/pendeedus/templates/page--user--login.html.twig", 72)->display($context);
        // line 73
        echo "    ";
        if ($this->getAttribute(($context["page"] ?? null), "highlighted", [])) {
            // line 74
            echo "      <div class=\"highlighted\">
        <aside class=\"";
            // line 75
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["container"] ?? null)), "html", null, true);
            echo " section clearfix\" role=\"complementary\">
          ";
            // line 76
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "highlighted", [])), "html", null, true);
            echo "
        </aside>
      </div>
    ";
        }
        // line 80
        echo "    ";
        if ($this->getAttribute(($context["page"] ?? null), "featured_top", [])) {
            // line 81
            echo "      ";
            $this->displayBlock('featured', $context, $blocks);
            // line 88
            echo "    ";
        }
        // line 89
        echo "    <div id=\"main-wrapper\" class=\"layout-main-wrapper clearfix\">
      ";
        // line 90
        $this->displayBlock('content', $context, $blocks);
        // line 122
        echo "    </div>
    ";
        // line 123
        if ((($this->getAttribute(($context["page"] ?? null), "featured_bottom_first", []) || $this->getAttribute(($context["page"] ?? null), "featured_bottom_second", [])) || $this->getAttribute(($context["page"] ?? null), "featured_bottom_third", []))) {
            // line 124
            echo "      <div class=\"featured-bottom\">
        <aside class=\"";
            // line 125
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["container"] ?? null)), "html", null, true);
            echo " clearfix\" role=\"complementary\">
          ";
            // line 126
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "featured_bottom_first", [])), "html", null, true);
            echo "
          ";
            // line 127
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "featured_bottom_second", [])), "html", null, true);
            echo "
          ";
            // line 128
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "featured_bottom_third", [])), "html", null, true);
            echo "
        </aside>
      </div>
    ";
        }
        // line 132
        echo "    <footer class=\"site-footer\">
      ";
        // line 133
        $this->displayBlock('footer', $context, $blocks);
        // line 150
        echo "    </footer>
  </div>
</div>
";
    }

    // line 81
    public function block_featured($context, array $blocks = [])
    {
        // line 82
        echo "        <div class=\"featured-top\">
          <aside class=\"featured-top__inner section ";
        // line 83
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["container"] ?? null)), "html", null, true);
        echo " clearfix\" role=\"complementary\">
            ";
        // line 84
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "featured_top", [])), "html", null, true);
        echo "
          </aside>
        </div>
      ";
    }

    // line 90
    public function block_content($context, array $blocks = [])
    {
        // line 91
        echo "        <div id=\"main\" class=\"";
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["container"] ?? null)), "html", null, true);
        echo "\">
          ";
        // line 92
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "breadcrumb", [])), "html", null, true);
        echo "
          <div class=\"row row-offcanvas row-offcanvas-left clearfix\">
            <main";
        // line 94
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["content_attributes"] ?? null)), "html", null, true);
        echo ">
              <section class=\"section\">
                <a id=\"main-content\" tabindex=\"-1\"></a>
                <div id=\"user-header\">Pendeedus</div>
                <div class=\"row\">
                  <div class=\"col-md-6 col-lg-4 offset-md-3 offset-lg-4\">
                    ";
        // line 100
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "content", [])), "html", null, true);
        echo "
                  </div>
                </div>
              </section>
            </main>
            ";
        // line 105
        if ($this->getAttribute(($context["page"] ?? null), "sidebar_first", [])) {
            // line 106
            echo "              <div";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["sidebar_first_attributes"] ?? null)), "html", null, true);
            echo ">
                <aside class=\"section\" role=\"complementary\">
                  ";
            // line 108
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "sidebar_first", [])), "html", null, true);
            echo "
                </aside>
              </div>
            ";
        }
        // line 112
        echo "            ";
        if ($this->getAttribute(($context["page"] ?? null), "sidebar_second", [])) {
            // line 113
            echo "              <div";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["sidebar_second_attributes"] ?? null)), "html", null, true);
            echo ">
                <aside class=\"section\" role=\"complementary\">
                  ";
            // line 115
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "sidebar_second", [])), "html", null, true);
            echo "
                </aside>
              </div>
            ";
        }
        // line 119
        echo "          </div>
        </div>
      ";
    }

    // line 133
    public function block_footer($context, array $blocks = [])
    {
        // line 134
        echo "        <div class=\"";
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["container"] ?? null)), "html", null, true);
        echo "\">
          ";
        // line 135
        if (((($this->getAttribute(($context["page"] ?? null), "footer_first", []) || $this->getAttribute(($context["page"] ?? null), "footer_second", [])) || $this->getAttribute(($context["page"] ?? null), "footer_third", [])) || $this->getAttribute(($context["page"] ?? null), "footer_fourth", []))) {
            // line 136
            echo "            <div class=\"site-footer__top clearfix\">
              ";
            // line 137
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "footer_first", [])), "html", null, true);
            echo "
              ";
            // line 138
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "footer_second", [])), "html", null, true);
            echo "
              ";
            // line 139
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "footer_third", [])), "html", null, true);
            echo "
              ";
            // line 140
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "footer_fourth", [])), "html", null, true);
            echo "
            </div>
          ";
        }
        // line 143
        echo "          ";
        if ($this->getAttribute(($context["page"] ?? null), "footer_fifth", [])) {
            // line 144
            echo "            <div class=\"site-footer__bottom\">
              ";
            // line 145
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "footer_fifth", [])), "html", null, true);
            echo "
            </div>
          ";
        }
        // line 148
        echo "        </div>
      ";
    }

    public function getTemplateName()
    {
        return "themes/custom/pendeedus/templates/page--user--login.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  262 => 148,  256 => 145,  253 => 144,  250 => 143,  244 => 140,  240 => 139,  236 => 138,  232 => 137,  229 => 136,  227 => 135,  222 => 134,  219 => 133,  213 => 119,  206 => 115,  200 => 113,  197 => 112,  190 => 108,  184 => 106,  182 => 105,  174 => 100,  165 => 94,  160 => 92,  155 => 91,  152 => 90,  144 => 84,  140 => 83,  137 => 82,  134 => 81,  127 => 150,  125 => 133,  122 => 132,  115 => 128,  111 => 127,  107 => 126,  103 => 125,  100 => 124,  98 => 123,  95 => 122,  93 => 90,  90 => 89,  87 => 88,  84 => 81,  81 => 80,  74 => 76,  70 => 75,  67 => 74,  64 => 73,  62 => 72,  58 => 70,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "themes/custom/pendeedus/templates/page--user--login.html.twig", "/var/www/pendeedus.mindimage.net/web/themes/custom/pendeedus/templates/page--user--login.html.twig");
    }
}
