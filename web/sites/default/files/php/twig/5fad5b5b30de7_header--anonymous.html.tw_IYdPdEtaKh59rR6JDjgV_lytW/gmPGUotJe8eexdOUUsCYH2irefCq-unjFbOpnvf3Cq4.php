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

/* @pendeedus/includes/header--anonymous.html.twig */
class __TwigTemplate_da3fce73f588fc1567c411384bfd9c407637a4eb6e208e3af70f18f0db42ab73 extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
            'head' => [$this, 'block_head'],
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $tags = ["block" => 2, "if" => 3];
        $filters = ["t" => 1, "escape" => 4];
        $functions = [];

        try {
            $this->sandbox->checkSecurity(
                ['block', 'if'],
                ['t', 'escape'],
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
        // line 1
        echo "<header id=\"header\" class=\"header\" role=\"banner\" aria-label=\"";
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar(t("Site header"));
        echo "\">
  ";
        // line 2
        $this->displayBlock('head', $context, $blocks);
        // line 44
        echo "</header>
";
    }

    // line 2
    public function block_head($context, array $blocks = [])
    {
        // line 3
        echo "    ";
        if (($this->getAttribute(($context["page"] ?? null), "top_header", []) || $this->getAttribute(($context["page"] ?? null), "top_header_form", []))) {
            // line 4
            echo "      <nav";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["navbar_top_attributes"] ?? null)), "html", null, true);
            echo ">
        ";
            // line 5
            if (($context["container_navbar"] ?? null)) {
                // line 6
                echo "        <div class=\"container\">
          ";
            }
            // line 8
            echo "          ";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "top_header", [])), "html", null, true);
            echo "
          ";
            // line 9
            if ($this->getAttribute(($context["page"] ?? null), "top_header_form", [])) {
                // line 10
                echo "            <div class=\"form-inline navbar-form ml-auto\">
              ";
                // line 11
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "top_header_form", [])), "html", null, true);
                echo "
            </div>
          ";
            }
            // line 14
            echo "          ";
            if (($context["container_navbar"] ?? null)) {
                // line 15
                echo "        </div>
        ";
            }
            // line 17
            echo "      </nav>
    ";
        }
        // line 19
        echo "    <nav";
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["navbar_attributes"] ?? null)), "html", null, true);
        echo ">
      ";
        // line 20
        if (($context["container_navbar"] ?? null)) {
            // line 21
            echo "      <div class=\"container\">
        ";
        }
        // line 23
        echo "        ";
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "header", [])), "html", null, true);
        echo "
        ";
        // line 24
        if (($this->getAttribute(($context["page"] ?? null), "primary_menu", []) || $this->getAttribute(($context["page"] ?? null), "header_form", []))) {
            // line 25
            echo "          <button class=\"navbar-toggler navbar-toggler-right\" type=\"button\" data-toggle=\"collapse\" data-target=\"#CollapsingNavbar\" aria-controls=\"CollapsingNavbar\" aria-expanded=\"false\" aria-label=\"Toggle navigation\"><span class=\"navbar-toggler-icon\"></span></button>
          <div class=\"collapse navbar-collapse justify-content-end\" id=\"CollapsingNavbar\">
            ";
            // line 27
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "primary_menu", [])), "html", null, true);
            echo "
            ";
            // line 28
            if ($this->getAttribute(($context["page"] ?? null), "header_form", [])) {
                // line 29
                echo "              <div class=\"form-inline navbar-form justify-content-end\">
                ";
                // line 30
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "header_form", [])), "html", null, true);
                echo "
              </div>
            ";
            }
            // line 33
            echo "            ";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "secondary_menu", [])), "html", null, true);
            echo "
          </div>
        ";
        }
        // line 36
        echo "        ";
        if (($context["sidebar_collapse"] ?? null)) {
            // line 37
            echo "          <button class=\"navbar-toggler navbar-toggler-left collapsed\" type=\"button\" data-toggle=\"collapse\" data-target=\"#CollapsingLeft\" aria-controls=\"CollapsingLeft\" aria-expanded=\"false\" aria-label=\"Toggle navigation\"></button>
        ";
        }
        // line 39
        echo "        ";
        if (($context["container_navbar"] ?? null)) {
            // line 40
            echo "      </div>
      ";
        }
        // line 42
        echo "    </nav>
  ";
    }

    public function getTemplateName()
    {
        return "@pendeedus/includes/header--anonymous.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  170 => 42,  166 => 40,  163 => 39,  159 => 37,  156 => 36,  149 => 33,  143 => 30,  140 => 29,  138 => 28,  134 => 27,  130 => 25,  128 => 24,  123 => 23,  119 => 21,  117 => 20,  112 => 19,  108 => 17,  104 => 15,  101 => 14,  95 => 11,  92 => 10,  90 => 9,  85 => 8,  81 => 6,  79 => 5,  74 => 4,  71 => 3,  68 => 2,  63 => 44,  61 => 2,  56 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "@pendeedus/includes/header--anonymous.html.twig", "/var/www/pendeedus.mindimage.net/web/themes/custom/pendeedus/templates/includes/header--anonymous.html.twig");
    }
}
