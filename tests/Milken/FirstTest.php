<?php

namespace Milken;

use PHPUnit\Framework\TestCase;

/**
 * Class FirstTest
 *
 * @package Milken
 */
class FirstTest extends TestCase {

  /**
   * @test
   *
   *
   */
  public function testTheFirstThing() {
    $this->assertTrue(true, "True should be true.");
    print_r($GLOBALS);
    //$this->assertTrue(false, "This test should fail");
  }

}
